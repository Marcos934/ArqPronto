import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../lib/supabase';

export function useStorage() {
  const uploadImage = useCallback(async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `project-images/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      if (!data) {
        throw new Error('Upload failed');
      }

      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }, []);

  const deleteImage = useCallback(async (url: string) => {
    try {
      // Extract the filename from the URL
      const urlParts = url.split('/');
      const filePath = `project-images/${urlParts[urlParts.length - 1]}`;

      const { error } = await supabase.storage
        .from('images')
        .remove([filePath]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }, []);

  return {
    uploadImage,
    deleteImage
  };
}