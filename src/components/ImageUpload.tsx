import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image as ImageIcon, X, ArrowLeft, ArrowRight, Loader2, Upload } from 'lucide-react';
import { optimizeImage } from '../utils/imageOptimizer';
import { useStorage } from '../hooks/useStorage';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  onUpload: (files: File[]) => Promise<void>;
  isUploading?: boolean;
}

export default function ImageUpload({ images, onChange, onUpload, isUploading = false }: ImageUploadProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const { deleteImage } = useStorage();
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    setPreviewImages(images || []);
  }, [images]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length + previewImages.length > 8) {
      alert('Máximo de 8 imagens permitido');
      return;
    }

    try {
      setUploadProgress(0);
      const optimizedFiles = await Promise.all(
        acceptedFiles.map(async (file, index) => {
          const optimized = await optimizeImage(file);
          setUploadProgress((prev) => prev + (100 / acceptedFiles.length));
          return optimized;
        })
      );
      await onUpload(optimizedFiles);
    } catch (error) {
      console.error('Error handling images:', error);
      alert('Erro ao processar imagens');
    } finally {
      setUploadProgress(0);
    }
  }, [previewImages.length, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 10485760, // 10MB
    disabled: isUploading
  });

  const removeImage = async (index: number) => {
    try {
      const imageUrl = previewImages[index];
      await deleteImage(imageUrl);
      
      const newImages = [...previewImages];
      newImages.splice(index, 1);
      setPreviewImages(newImages);
      onChange(newImages);
    } catch (error) {
      console.error('Error removing image:', error);
      alert('Erro ao remover imagem');
    }
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= previewImages.length) return;
    const newImages = [...previewImages];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setPreviewImages(newImages);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Status Banner */}
      {isUploading && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
              <span className="text-indigo-700 font-medium">Carregando imagem - Aguarde</span>
            </div>
            <div className="text-sm text-indigo-600 font-medium">
              {Math.round(uploadProgress)}%
            </div>
          </div>
          <div className="mt-2 w-full bg-indigo-100 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} disabled={isUploading} />
        <div className="flex flex-col items-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? 'Solte as imagens aqui...'
              : 'Arraste e solte imagens aqui, ou clique para selecionar'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Máximo de 8 imagens, 10MB cada. JPG, PNG ou WEBP
          </p>
        </div>
      </div>

      {/* Image Preview Grid */}
      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previewImages.map((url, index) => (
            <div key={url} className="relative group">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className={`rounded-lg object-cover w-full h-full ${isUploading ? 'opacity-50' : ''}`}
                />
              </div>
              
              {/* Image Controls */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button
                  type="button"
                  onClick={() => moveImage(index, index - 1)}
                  disabled={index === 0 || isUploading}
                  className="p-1 text-white hover:text-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  disabled={isUploading}
                  className="p-1 text-white hover:text-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(index, index + 1)}
                  disabled={index === previewImages.length - 1 || isUploading}
                  className="p-1 text-white hover:text-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              {/* Featured Badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                  Destaque
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}