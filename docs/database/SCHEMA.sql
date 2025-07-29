-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create storage schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS storage;

-- Create storage buckets table
CREATE TABLE IF NOT EXISTS storage.buckets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  owner UUID REFERENCES auth.users,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  public BOOLEAN DEFAULT FALSE
);

-- Create storage objects table
CREATE TABLE IF NOT EXISTS storage.objects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bucket_id TEXT REFERENCES storage.buckets(id),
  name TEXT NOT NULL,
  owner UUID REFERENCES auth.users,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::JSONB,
  path_tokens TEXT[] GENERATED ALWAYS AS (string_to_array(name, '/')) STORED
);

-- Create required indexes for storage
CREATE INDEX IF NOT EXISTS bname ON storage.buckets(name);
CREATE INDEX IF NOT EXISTS objects_path_tokens_idx ON storage.objects USING GIN (path_tokens);
CREATE INDEX IF NOT EXISTS bucket_id_name_idx ON storage.objects(bucket_id, name);

-- Create storage buckets for the application
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('project-images', 'project-images', true),
  ('site-assets', 'site-assets', true)
ON CONFLICT DO NOTHING;

-- Create storage policies for project images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Auth Users Can Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-images' AND
  (storage.foldername(name))[1] = 'projects'
);

CREATE POLICY "Auth Users Can Update Own Files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'project-images')
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Auth Users Can Delete Own Files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'project-images');

-- Create storage policies for site assets
CREATE POLICY "Public Access Site Assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

CREATE POLICY "Auth Users Can Upload Site Assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'site-assets' AND
  (storage.foldername(name))[1] IN ('logos', 'banners', 'meta')
);

CREATE POLICY "Auth Users Can Update Site Assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-assets')
WITH CHECK (bucket_id = 'site-assets');

CREATE POLICY "Auth Users Can Delete Site Assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'site-assets');

-- Enable Row Level Security
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

-- Create admin users table
CREATE TABLE usuarios_admin (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE projetos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  tipo ENUM('residencial', 'comercial') NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  preco_original DECIMAL(10,2),
  preco_promocional DECIMAL(10,2),
  promocao_ativa BOOLEAN DEFAULT FALSE,
  promocao_inicio TIMESTAMP,
  promocao_fim TIMESTAMP,
  destaque BOOLEAN DEFAULT FALSE,
  area DECIMAL(10,2) NOT NULL,
  imagens JSON NOT NULL DEFAULT '[]',
  detalhes JSON NOT NULL,
  especificacoes_tecnicas JSON NOT NULL,
  areas_internas JSON NOT NULL,
  inclusos JSON NOT NULL DEFAULT '[]',
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create site settings table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name VARCHAR(255) NOT NULL DEFAULT 'ArqPronto',
  whatsapp_number VARCHAR(20),
  instagram_link TEXT,
  facebook_pixel_id VARCHAR(50),
  logo_url TEXT,
  meta_description TEXT,
  meta_image_url TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create banners table
CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  desktop_image_url TEXT NOT NULL,
  mobile_image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_projetos_tipo ON projetos(tipo);
CREATE INDEX idx_projetos_status ON projetos(status);
CREATE INDEX idx_projetos_promocao ON projetos(promocao_ativa, promocao_inicio, promocao_fim);
CREATE INDEX idx_projetos_destaque ON projetos(destaque);
CREATE INDEX idx_projetos_created ON projetos(created_at);
CREATE INDEX idx_usuarios_email ON usuarios_admin(email);
CREATE INDEX idx_banners_order ON banners(order_index);

-- Create triggers for updated_at
DELIMITER //

CREATE TRIGGER update_projeto_timestamp
BEFORE UPDATE ON projetos
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END//

CREATE TRIGGER update_usuario_timestamp
BEFORE UPDATE ON usuarios_admin
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END//

CREATE TRIGGER update_settings_timestamp
BEFORE UPDATE ON site_settings
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END//

CREATE TRIGGER update_banner_timestamp
BEFORE UPDATE ON banners
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END//

-- Create trigger for cleaning up old images when updating projects
CREATE TRIGGER cleanup_old_images
AFTER UPDATE ON projetos
FOR EACH ROW
BEGIN
    -- If images have changed
    IF OLD.imagens IS NOT NULL AND NEW.imagens IS DISTINCT FROM OLD.imagens THEN
        -- Delete removed images from storage
        INSERT INTO storage.deletions (bucket_id, object_path)
        SELECT 'project-images', json_array_elements_text(OLD.imagens::json)
        WHERE json_array_elements_text(OLD.imagens::json) NOT IN (
            SELECT json_array_elements_text(NEW.imagens::json)
        );
    END IF;
END//

DELIMITER ;

-- Create storage.deletions table for tracking files to be deleted
CREATE TABLE storage.deletions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bucket_id TEXT NOT NULL,
  object_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for deletions cleanup
CREATE INDEX idx_deletions_created ON storage.deletions(created_at);