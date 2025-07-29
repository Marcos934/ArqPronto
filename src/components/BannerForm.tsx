import { memo } from 'react';
import { GripVertical, Trash2, Info } from 'lucide-react';
import SiteImageUpload from './admin/SiteImageUpload';
import type { Banner } from '../types/site-settings';

interface BannerFormProps {
  banner: Banner;
  dragHandleProps: any;
  isUploading: boolean;
  onBannerChange: (bannerId: string, field: keyof Banner, value: any) => void;
  onRemoveBanner: (bannerId: string) => void;
  onBannerImageUpload: (files: File[], bannerId: string, type: 'desktop' | 'mobile') => Promise<void>;
}

const BannerForm = ({
  banner,
  dragHandleProps,
  isUploading,
  onBannerChange,
  onRemoveBanner,
  onBannerImageUpload
}: BannerFormProps) => {
  const inputClassName = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-4 px-4 text-base";

  // Define cores diferentes para cada banner
  const getBannerColors = (order: number) => {
    switch (order) {
      case 0:
        return 'bg-orange-50 border-l-4 border-orange-500';
      case 1:
        return 'bg-amber-50 border-l-4 border-amber-500';
      case 2:
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-sm ${getBannerColors(banner.order)}`}>
      <div className="flex items-center justify-between mb-6">
        <div
          {...dragHandleProps}
          className="flex items-center gap-2 text-gray-700 cursor-move"
        >
          <GripVertical className="h-5 w-5" />
          <span className="font-semibold text-lg">Banner {banner.order + 1}</span>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={banner.isActive}
              onChange={(e) => onBannerChange(banner.id, 'isActive', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">Ativo</span>
          </label>
          <button
            type="button"
            onClick={() => onRemoveBanner(banner.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título
            <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
              <Info className="h-3 w-3" />
              Título principal do banner
            </div>
          </label>
          <textarea
            value={banner.title}
            onChange={(e) => onBannerChange(banner.id, 'title', e.target.value)}
            className={inputClassName}
            rows={2}
            style={{ padding: '16px' }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtítulo
            <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
              <Info className="h-3 w-3" />
              Texto complementar do banner (opcional)
            </div>
          </label>
          <textarea
            value={banner.subtitle}
            onChange={(e) => onBannerChange(banner.id, 'subtitle', e.target.value)}
            className={inputClassName}
            rows={2}
            style={{ padding: '16px' }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagem Desktop
            <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
              <Info className="h-3 w-3" />
              Dimensão recomendada: 1255x261
            </div>
          </label>
          <SiteImageUpload
            type="banner-desktop"
            image={banner.desktopImage}
            onChange={(url) => onBannerChange(banner.id, 'desktopImage', url)}
            onUpload={(file) => onBannerImageUpload([file], banner.id, 'desktop')}
            isUploading={isUploading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagem Mobile
            <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
              <Info className="h-3 w-3" />
              Dimensão recomendada: 1080x596
            </div>
          </label>
          <SiteImageUpload
            type="banner-mobile"
            image={banner.mobileImage}
            onChange={(url) => onBannerChange(banner.id, 'mobileImage', url)}
            onUpload={(file) => onBannerImageUpload([file], banner.id, 'mobile')}
            isUploading={isUploading}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(BannerForm);