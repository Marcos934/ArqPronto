-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create site_settings table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  whatsapp_number VARCHAR(20),
  instagram_link TEXT,
  facebook_pixel_id VARCHAR(50),
  logo_url TEXT,
  meta_description TEXT,
  meta_image_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create banners table
CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  action_type VARCHAR(20) NOT NULL, -- 'scroll' or 'redirect'
  action_target TEXT NOT NULL,
  desktop_image_url TEXT NOT NULL,
  mobile_image_url TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banners_updated_at
  BEFORE UPDATE ON banners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default site settings
INSERT INTO site_settings (
  whatsapp_number,
  instagram_link,
  facebook_pixel_id,
  meta_description
) VALUES (
  '5592991325218',
  'https://www.instagram.com/terraraconstrucoes/',
  '',
  'Encontre o projeto arquitetônico ideal para sua construção na ArqPronto. Projetos residenciais e comerciais com qualidade e preço justo.'
);