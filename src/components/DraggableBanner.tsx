import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GripVertical, Trash2 } from 'lucide-react';
import ImageUpload from './ImageUpload';
import type { Banner } from '../types/site-settings';

interface DraggableBannerProps {
  banner: Banner;
  index: number;
  isUploading: boolean;
  onBannerChange: (bannerId: string, field: keyof Banner, value: any) => void;
  onRemoveBanner: (bannerId: string) => void;
  onBannerImageUpload: (files: File[], bannerId: string, type: 'desktop' | 'mobile') => Promise<void>;
}

const DraggableBanner = ({
  banner,
  index,
  isUploading,
  onBannerChange,
  onRemoveBanner,
  onBannerImageUpload
}: DraggableBannerProps) => {
  return (
    <Draggable draggableId={banner.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              {...provided.dragHandleProps}
              className="flex items-center gap-2 text-gray-500 cursor-move"
            >
              <GripVertical className="h-5 w-5" />
              <span className="font-medium">Banner {index + 1}</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={banner.isActive}
                  onChange={(e) => onBannerChange(banner.id, 'isActive', e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">Active</span>
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
                Title
              </label>
              <input
                type="text"
                value={banner.title}
                onChange={(e) => onBannerChange(banner.id, 'title', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={banner.subtitle}
                onChange={(e) => onBannerChange(banner.id, 'subtitle', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desktop Image
              </label>
              <ImageUpload
                images={banner.desktopImage ? [banner.desktopImage] : []}
                onChange={(urls) => onBannerChange(banner.id, 'desktopImage', urls[0] || '')}
                onUpload={(files) => onBannerImageUpload(files, banner.id, 'desktop')}
                isUploading={isUploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Image
              </label>
              <ImageUpload
                images={banner.mobileImage ? [banner.mobileImage] : []}
                onChange={(urls) => onBannerChange(banner.id, 'mobileImage', urls[0] || '')}
                onUpload={(files) => onBannerImageUpload(files, banner.id, 'mobile')}
                isUploading={isUploading}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default memo(DraggableBanner);