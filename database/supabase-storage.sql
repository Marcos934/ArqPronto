-- Enable Storage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true);

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' AND
  (storage.foldername(name))[1] = 'project-images'
);

-- Create policy to allow public to view images
CREATE POLICY "Allow public to view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

-- Create policy to allow authenticated users to delete their images
CREATE POLICY "Allow authenticated users to delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'images');

-- Set up storage triggers for cleanup
CREATE OR REPLACE FUNCTION delete_old_image()
RETURNS TRIGGER AS $$
BEGIN
  -- Delete old image if it exists and is different from the new one
  IF OLD.imagens IS DISTINCT FROM NEW.imagens THEN
    -- Logic to delete unused images would go here
    -- This is a placeholder for actual implementation
    NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cleanup_old_images
  AFTER UPDATE ON projetos
  FOR EACH ROW
  EXECUTE FUNCTION delete_old_image();