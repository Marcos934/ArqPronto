import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { SiteSettings } from '../types/site-settings';

export function useGlobalSettings() {
  return useQuery({
    queryKey: ['global-settings'],
    queryFn: async () => {
      try {
        // Fetch site settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('site_settings')
          .select('*')
          .limit(1)
          .single();

        if (settingsError) throw settingsError;

        // Fetch active banners
        const { data: bannersData, error: bannersError } = await supabase
          .from('banners')
          .select('*')
          .eq('is_active', true)
          .order('order');

        if (bannersError) throw bannersError;

        // Format the data
        const settings: SiteSettings = {
          id: settingsData.id,
          whatsappNumber: settingsData.whatsapp_number,
          instagramLink: settingsData.instagram_link,
          facebookPixelId: settingsData.facebook_pixel_id,
          logo: settingsData.logo_url,
          metaDescription: settingsData.meta_description,
          metaImage: settingsData.meta_image_url,
          banners: bannersData.map(banner => ({
            id: banner.id,
            title: banner.title,
            subtitle: banner.subtitle,
            desktopImage: banner.desktop_image_url,
            mobileImage: banner.mobile_image_url,
            isActive: banner.is_active,
            order: banner.order
          }))
        };

        return settings;
      } catch (error) {
        console.error('Error fetching global settings:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    cacheTime: 1000 * 60 * 30 // Keep in cache for 30 minutes
  });
}