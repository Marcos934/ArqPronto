import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import type { SiteSettings, Banner } from '../types/site-settings';

export function useSiteSettings() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading: isSettingsLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      try {
        // Fetch site settings - get the first record
        const { data: settingsData, error: settingsError } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1)
          .single();

        if (settingsError) {
          console.error('Error fetching settings:', settingsError);
          throw settingsError;
        }

        // Fetch banners
        const { data: bannersData, error: bannersError } = await supabase
          .from('banners')
          .select('*')
          .order('order');

        if (bannersError) {
          console.error('Error fetching banners:', bannersError);
          throw bannersError;
        }

        // Format the data to match our SiteSettings type
        const formattedSettings: SiteSettings = {
          id: settingsData.id,
          whatsappNumber: settingsData?.whatsapp_number || '',
          instagramLink: settingsData?.instagram_link || '',
          facebookPixelId: settingsData?.facebook_pixel_id || '',
          logo: settingsData?.logo_url || '',
          metaDescription: settingsData?.meta_description || '',
          metaImage: settingsData?.meta_image_url || '',
          banners: (bannersData || []).map(banner => ({
            id: banner.id,
            title: banner.title,
            subtitle: banner.subtitle || '',
            desktopImage: banner.desktop_image_url,
            mobileImage: banner.mobile_image_url,
            isActive: banner.is_active,
            order: banner.order
          }))
        };

        return formattedSettings;
      } catch (error) {
        console.error('Error fetching site settings:', error);
        throw error;
      }
    }
  });

  const updateSettings = useMutation({
    mutationFn: async (newSettings: SiteSettings) => {
      if (!newSettings.id) {
        throw new Error('Settings ID is required');
      }

      try {
        // Update site settings
        const { error: settingsError } = await supabase
          .from('site_settings')
          .update({
            whatsapp_number: newSettings.whatsappNumber,
            instagram_link: newSettings.instagramLink,
            facebook_pixel_id: newSettings.facebookPixelId,
            logo_url: newSettings.logo,
            meta_description: newSettings.metaDescription,
            meta_image_url: newSettings.metaImage
          })
          .eq('id', newSettings.id);

        if (settingsError) {
          console.error('Error updating settings:', settingsError);
          throw settingsError;
        }

        // Handle banners
        if (newSettings.banners) {
          // Delete all existing banners
          const { error: deleteError } = await supabase
            .from('banners')
            .delete()
            .not('id', 'is', null); // Delete all records

          if (deleteError) {
            console.error('Error deleting banners:', deleteError);
            throw deleteError;
          }

          // Insert new banners if any exist
          if (newSettings.banners.length > 0) {
            const dbBanners = newSettings.banners.map((banner, index) => ({
              id: banner.id,
              title: banner.title,
              subtitle: banner.subtitle,
              desktop_image_url: banner.desktopImage,
              mobile_image_url: banner.mobileImage,
              is_active: banner.isActive,
              order: index
            }));

            const { error: bannersError } = await supabase
              .from('banners')
              .insert(dbBanners);

            if (bannersError) {
              console.error('Error inserting banners:', bannersError);
              throw bannersError;
            }
          }
        }

        return newSettings;
      } catch (error) {
        console.error('Error updating site settings:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast.success('Configurações salvas com sucesso!');
    },
    onError: (error) => {
      console.error('Error saving settings:', error);
      toast.error('Erro ao salvar as configurações. Por favor, tente novamente.');
    }
  });

  return {
    settings,
    isLoading: isSettingsLoading,
    updateSettings
  };
}