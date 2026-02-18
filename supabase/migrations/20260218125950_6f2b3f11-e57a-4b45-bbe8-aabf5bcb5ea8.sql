-- Fix 1: Remove anonymous storage policies
DROP POLICY IF EXISTS "Allow anonymous document uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous document viewing" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous document deletion" ON storage.objects;

-- Fix 2: Harden handle_new_user with input validation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
DECLARE
  full_name_value TEXT;
BEGIN
  -- Validate and sanitize full_name from metadata
  full_name_value := TRIM(COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''));
  
  -- Limit length to prevent abuse
  IF LENGTH(full_name_value) > 100 THEN
    full_name_value := SUBSTRING(full_name_value, 1, 100);
  END IF;
  
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NULLIF(full_name_value, ''));
  
  RETURN NEW;
END;
$$;