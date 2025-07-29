import imageCompression from 'browser-image-compression';

export async function optimizeImage(file: File) {
  const options = {
    maxSizeMB: 1, // Max file size in MB
    maxWidthOrHeight: 1920, // Max width/height
    useWebWorker: true,
    fileType: 'image/jpeg' // Convert all images to JPEG for better compression
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error optimizing image:', error);
    throw error;
  }
}