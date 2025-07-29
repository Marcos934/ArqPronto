export interface SiteSettings {
  id: string;
  siteName: string;
  whatsappNumber: string;
  instagramLink: string;
  facebookPixelId: string;
  logo: string;
  metaDescription: string;
  metaImage: string;
  banners: Banner[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  desktopImage: string;
  mobileImage: string;
  isActive: boolean;
  order: number;
}