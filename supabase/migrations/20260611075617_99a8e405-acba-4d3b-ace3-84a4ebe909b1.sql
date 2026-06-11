
-- 1. Tighten profiles INSERT to authenticated only
DO $$
DECLARE pol record;
BEGIN
  FOR pol IN SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename='profiles' AND cmd='INSERT'
  LOOP EXECUTE format('DROP POLICY %I ON public.profiles', pol.policyname); END LOOP;
END $$;

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 2. Allow users to delete their own profile
CREATE POLICY "Users can delete their own profile"
ON public.profiles FOR DELETE TO authenticated
USING (auth.uid() = user_id);

-- 3. Discussions: authors can update/delete
CREATE POLICY "Authors can update their own discussions"
ON public.discussions FOR UPDATE TO authenticated
USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own discussions"
ON public.discussions FOR DELETE TO authenticated
USING (auth.uid() = author_id);

-- 4. Discussion replies: authors can update/delete
CREATE POLICY "Authors can update their own replies"
ON public.discussion_replies FOR UPDATE TO authenticated
USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own replies"
ON public.discussion_replies FOR DELETE TO authenticated
USING (auth.uid() = author_id);

-- 5. Blog comments: authors can update/delete
CREATE POLICY "Authors can update their own comments"
ON public.blog_comments FOR UPDATE TO authenticated
USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own comments"
ON public.blog_comments FOR DELETE TO authenticated
USING (auth.uid() = author_id);

-- 6. Revoke EXECUTE on SECURITY DEFINER helper functions from anon/authenticated
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, PUBLIC;
