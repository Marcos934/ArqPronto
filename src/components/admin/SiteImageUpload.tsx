import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image as ImageIcon, X, Loader2, Upload } from 'lucide-react';

interface SiteImageUploadProps {
  image: string;
  onChange: (image: string) => void;
  onUpload: (file: File) => Promise<void>;
  isUploading?: boolean;
  type: 'logo' | 'meta' | 'banner-desktop' | 'banner-mobile';
}

export default function SiteImageUpload({ 
  image, 
  onChange, 
  onUpload, 
  isUploading = false,
  type 
}: SiteImageUploadProps) {
  const [previewImage, setPreviewImage] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    setPreviewImage(image || '');
  }, [image]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    try {
      setUploadProgress(0);
      await onUpload(acceptedFiles[0]);
      setUploadProgress(100);
    } catch (error) {
      console.error('Error handling image:', error);
      alert('Erro ao processar imagem');
    } finally {
      setUploadProgress(0);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 10485760, // 10MB
    disabled: isUploading || !!previewImage, // Desabilita o upload se já houver uma imagem
    maxFiles: 1,
    multiple: false // Garante que apenas uma imagem pode ser selecionada
  });

  const removeImage = () => {
    setPreviewImage('');
    onChange('');
  };

  const getPlaceholderText = () => {
    switch (type) {
      case 'logo':
        return 'Logo do site (apenas 1 imagem)';
      case 'meta':
        return 'Imagem para redes sociais (apenas 1 imagem)';
      case 'banner-desktop':
        return 'Imagem do banner para desktop (apenas 1 imagem)';
      case 'banner-mobile':
        return 'Imagem do banner para mobile (apenas 1 imagem)';
      default:
        return 'Selecione uma imagem';
    }
  };

  const getImageStyle = () => {
    switch (type) {
      case 'logo':
        return 'h-16 object-contain';
      case 'meta':
        return 'h-48 object-cover';
      case 'banner-desktop':
      case 'banner-mobile':
        return 'h-48 object-cover';
      default:
        return 'h-48 object-cover';
    }
  };

  // Se já existe uma imagem, mostra apenas a preview com opção de remover
  if (previewImage) {
    return (
      <div className="relative bg-gray-100 rounded-lg p-4 flex items-center justify-center">
        <img
          src={previewImage}
          alt="Preview"
          className={`max-w-full rounded-lg ${getImageStyle()}`}
        />
        <button
          type="button"
          onClick={removeImage}
          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          title="Remover imagem"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // Se não há imagem, mostra a área de upload
  return (
    <div className="space-y-4">
      {/* Loading State */}
      {isUploading && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
              <span className="text-indigo-700 font-medium">Carregando imagem</span>
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

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? 'Solte a imagem aqui...'
              : `Arraste e solte ou clique para selecionar - ${getPlaceholderText()}`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Máximo de 10MB. JPG, PNG ou WEBP
          </p>
        </div>
      </div>
    </div>
  );
}