-- Create storage bucket for user documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-documents', 'user-documents', false);

-- Allow authenticated users to upload their own documents
CREATE POLICY "Users can upload their own documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'user-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to view their own documents
CREATE POLICY "Users can view their own documents"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'user-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to delete their own documents
CREATE POLICY "Users can delete their own documents"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'user-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow anonymous uploads for demo purposes (temporary documents)
CREATE POLICY "Allow anonymous document uploads"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'user-documents' AND
  (storage.foldername(name))[1] = 'anonymous'
);

-- Allow anonymous users to view their uploaded documents
CREATE POLICY "Allow anonymous document viewing"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'user-documents' AND
  (storage.foldername(name))[1] = 'anonymous'
);

-- Allow anonymous users to delete their documents
CREATE POLICY "Allow anonymous document deletion"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'user-documents' AND
  (storage.foldername(name))[1] = 'anonymous'
);