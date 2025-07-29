import { useState, useEffect } from 'react';
import { Save, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import DroppableList from '../../components/DroppableList';
import DraggableItem from '../../components/DraggableItem';
import BannerForm from '../../components/BannerForm';
import SiteImageUpload from '../../components/admin/SiteImageUpload';
import { useStorage } from '../../hooks/useStorage';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import type { SiteSettings, Banner } from '../../types/site-settings';

export default function SiteSettings() {
  const [isUploading, setIsUploading] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const { uploadImage } = useStorage();
  const { settings, isLoading, updateSettings } = useSiteSettings();
  
  const { register, handleSubmit, setValue, watch, reset } = useForm<SiteSettings>({
    defaultValues: {
      id: '',
      whatsappNumber: '',
      instagramLink: '',
      facebookPixelId: '',
      logo: '',
      metaDescription: '',
      metaImage: '',
      banners: []
    }
  });

  // Load initial data
  useEffect(() => {
    if (settings) {
      reset(settings);
      setBanners(settings.banners || []);
    }
  }, [settings, reset]);

  const handleLogoUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      setValue('logo', url);
      toast.success('Logo atualizado com sucesso');
    } catch (error) {
      toast.error('Erro ao fazer upload do logo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleMetaImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      setValue('metaImage', url);
      toast.success('Imagem meta atualizada com sucesso');
    } catch (error) {
      toast.error('Erro ao fazer upload da imagem meta');
    } finally {
      setIsUploading(false);
    }
  };

  const handleBannerImageUpload = async (file: File, bannerId: string, type: 'desktop' | 'mobile') => {
    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      const newBanners = banners.map(banner => {
        if (banner.id === bannerId) {
          return {
            ...banner,
            [type === 'desktop' ? 'desktopImage' : 'mobileImage']: url
          };
        }
        return banner;
      });
      setBanners(newBanners);
      toast.success('Imagem do banner atualizada com sucesso');
    } catch (error) {
      toast.error('Erro ao fazer upload da imagem do banner');
    } finally {
      setIsUploading(false);
    }
  };

  const addBanner = () => {
    if (banners.length >= 3) {
      toast.error('Máximo de 3 banners permitido');
      return;
    }

    const newBanner: Banner = {
      id: crypto.randomUUID(),
      title: '',
      subtitle: '',
      desktopImage: '',
      mobileImage: '',
      isActive: true,
      order: banners.length
    };

    setBanners([...banners, newBanner]);
  };

  const removeBanner = (bannerId: string) => {
    setBanners(banners.filter(banner => banner.id !== bannerId));
  };

  const handleBannerChange = (bannerId: string, field: keyof Banner, value: any) => {
    setBanners(banners.map(banner => {
      if (banner.id === bannerId) {
        return { ...banner, [field]: value };
      }
      return banner;
    }));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(banners);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedBanners = items.map((banner, index) => ({
      ...banner,
      order: index
    }));

    setBanners(updatedBanners);
  };

  const onSubmit = async (data: SiteSettings) => {
    if (!settings?.id) {
      toast.error('Erro: ID das configurações não encontrado');
      return;
    }

    try {
      await updateSettings.mutateAsync({
        id: settings.id,
        ...data,
        banners
      });
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const inputClassName = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-4 px-4 text-base";
  const textareaClassName = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base min-h-[120px]";

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Configurações do Site</h1>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={updateSettings.isPending}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          <Save className="h-4 w-4 mr-2" />
          {updateSettings.isPending ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>

      <form className="space-y-8">
        {/* Configurações Gerais */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Configurações Gerais</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número do WhatsApp
                <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Formato internacional sem espaços ou caracteres especiais (ex: 5592991234567)
                </div>
              </label>
              <input
                type="text"
                {...register('whatsappNumber')}
                className={inputClassName}
                placeholder="ex: 5592991234567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link do Instagram
                <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  URL completa do seu perfil no Instagram
                </div>
              </label>
              <input
                type="url"
                {...register('instagramLink')}
                className={inputClassName}
                placeholder="https://instagram.com/suaconta"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook Pixel ID
                <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  ID do seu Pixel para rastreamento de conversões
                </div>
              </label>
              <input
                type="text"
                {...register('facebookPixelId')}
                className={inputClassName}
                placeholder="ex: 123456789"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo do Site
                <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Imagem PNG Fundo transparente 1:1, recomendado 240x240
                </div>
              </label>
              <SiteImageUpload
                type="logo"
                image={watch('logo')}
                onChange={(url) => setValue('logo', url)}
                onUpload={handleLogoUpload}
                isUploading={isUploading}
              />
            </div>
          </div>
        </div>

        {/* Configurações SEO */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Configurações SEO</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Descrição
                <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Descrição que aparece nos resultados de busca (máx. 160 caracteres)
                </div>
              </label>
              <textarea
                {...register('metaDescription')}
                rows={3}
                className={textareaClassName}
                placeholder="Descrição do site para mecanismos de busca"
                maxLength={160}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagem Meta
                <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Imagem que aparece ao compartilhar o site (recomendado 1200x630px)
                </div>
              </label>
              <SiteImageUpload
                type="meta"
                image={watch('metaImage')}
                onChange={(url) => setValue('metaImage', url)}
                onUpload={handleMetaImageUpload}
                isUploading={isUploading}
              />
            </div>
          </div>
        </div>

        {/* Gerenciamento de Banners */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold">Gerenciamento de Banners</h2>
              <p className="mt-1 text-sm text-gray-500">
                Adicione até 3 banners para o carrossel da página inicial
              </p>
            </div>
            <button
              type="button"
              onClick={addBanner}
              disabled={banners.length >= 3}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Adicionar Banner
            </button>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <DroppableList droppableId="banners" className="space-y-4">
              {banners.map((banner, index) => (
                <DraggableItem
                  key={banner.id}
                  draggableId={banner.id}
                  index={index}
                  className="bg-gray-50 rounded-lg"
                >
                  {(dragHandleProps) => (
                    <BannerForm
                      banner={banner}
                      dragHandleProps={dragHandleProps}
                      isUploading={isUploading}
                      onBannerChange={handleBannerChange}
                      onRemoveBanner={removeBanner}
                      onBannerImageUpload={(files, bannerId, type) => 
                        handleBannerImageUpload(files[0], bannerId, type)
                      }
                    />
                  )}
                </DraggableItem>
              ))}
            </DroppableList>
          </DragDropContext>

          {banners.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum banner</h3>
              <p className="mt-1 text-sm text-gray-500">
                Comece adicionando um novo banner.
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}