-- Insert admin user (password: Admin@123)
INSERT INTO usuarios_admin (nome, email, senha) VALUES (
  'Administrador',
  'admin@arqpronto.com',
  '$2a$10$8DGFx3H3.UH89WJgw/X9.OqLdvyVUxwQOGhJPsYd.zrRwFKcZPKpW'
);

-- Insert site settings with mock images from Supabase storage
INSERT INTO site_settings (
  site_name,
  whatsapp_number,
  instagram_link,
  meta_description,
  logo_url,
  meta_image_url
) VALUES (
  'ArqPronto',
  '5592991234567',
  'https://instagram.com/arqpronto',
  'Encontre o projeto arquitetônico ideal para sua construção na ArqPronto. Projetos residenciais e comerciais com qualidade e preço justo.',
  'https://fdfgwfdvxgjwgycyubxs.supabase.co/storage/v1/object/public/site-assets/logos/logo-default.png',
  'https://fdfgwfdvxgjwgycyubxs.supabase.co/storage/v1/object/public/site-assets/meta/meta-default.jpg'
);

-- Upload mock images to Supabase storage buckets
-- Note: These need to be executed via Supabase client or dashboard
/*
Required folder structure in Supabase storage:

project-images/
  ├── projects/
  │   ├── modern-house-1.jpg
  │   ├── modern-house-2.jpg
  │   ├── minimal-house-1.jpg
  │   └── minimal-house-2.jpg
  
site-assets/
  ├── logos/
  │   └── logo-default.png
  ├── banners/
  │   ├── banner-1-desktop.jpg
  │   ├── banner-1-mobile.jpg
  │   ├── banner-2-desktop.jpg
  │   └── banner-2-mobile.jpg
  └── meta/
      └── meta-default.jpg
*/

-- Insert sample projects with Supabase storage URLs
INSERT INTO projetos (
  titulo,
  descricao,
  tipo,
  preco,
  area,
  imagens,
  detalhes,
  especificacoes_tecnicas,
  areas_internas,
  inclusos,
  destaque,
  status
) VALUES 
-- Projeto 1: Residência Moderna Vista Mar
(
  'Residência Moderna Vista Mar',
  'Projeto contemporâneo com 280m², ideal para terrenos de 15x30m. Design clean com amplos espaços integrados e vista privilegiada.',
  'residencial',
  1250.00,
  280,
  '[
    "https://fdfgwfdvxgjwgycyubxs.supabase.co/storage/v1/object/public/project-images/projects/modern-house-1.jpg",
    "https://fdfgwfdvxgjwgycyubxs.supabase.co/storage/v1/object/public/project-images/projects/modern-house-2.jpg"
  ]',
  '{
    "quartos": 4,
    "suites": 2,
    "banheiros": 5,
    "vagas": 3,
    "closets": 2,
    "areaGourmet": true,
    "pavimentos": 2,
    "andares": 2,
    "estilo": "Contemporâneo"
  }',
  '{
    "areaTotal": 280,
    "larguraCasa": 12,
    "profundidadeCasa": 20,
    "areaTerreno": 450,
    "larguraTerreno": 15,
    "profundidadeTerreno": 30
  }',
  '{
    "sala": 45,
    "cozinha": 25,
    "lavanderia": 8,
    "areaGourmet": 30,
    "banheiros": 20
  }',
  '[
    "Projeto arquitetônico completo",
    "Projeto estrutural",
    "Projeto hidráulico",
    "Projeto elétrico",
    "Imagens 3D realistas"
  ]',
  true,
  'ativo'
),

-- Projeto 2: Casa Minimalista Urbana
(
  'Casa Minimalista Urbana',
  'Residência de 180m² com design minimalista, perfeita para terrenos urbanos de 12x25m. Integração total com área externa.',
  'residencial',
  980.00,
  180,
  '[
    "https://fdfgwfdvxgjwgycyubxs.supabase.co/storage/v1/object/public/project-images/projects/minimal-house-1.jpg",
    "https://fdfgwfdvxgjwgycyubxs.supabase.co/storage/v1/object/public/project-images/projects/minimal-house-2.jpg"
  ]',
  '{
    "quartos": 3,
    "suites": 1,
    "banheiros": 3,
    "vagas": 2,
    "closets": 1,
    "areaGourmet": true,
    "pavimentos": 1,
    "andares": 1,
    "estilo": "Minimalista"
  }',
  '{
    "areaTotal": 180,
    "larguraCasa": 10,
    "profundidadeCasa": 18,
    "areaTerreno": 300,
    "larguraTerreno": 12,
    "profundidadeTerreno": 25
  }',
  '{
    "sala": 35,
    "cozinha": 20,
    "lavanderia": 6,
    "areaGourmet": 25,
    "banheiros": 12
  }',
  '[
    "Projeto completo",
    "Memorial descritivo",
    "Projeto de interiores básico",
    "Renderizações 3D",
    "Assessoria técnica"
  ]',
  false,
  'ativo'
);

-- Insert sample banners with Supabase storage URLs
INSERT INTO banners (
  title,
  subtitle,
  desktop_image_url,
  mobile_image_url,
  is_active,
  order_index
) VALUES 
(
  'Projetos Modernos e Funcionais',
  'Descubra nossa linha de projetos residenciais',
  'https://fdfgwfdvxgjwgycyubxs.supabase.co/storage/v1/object/public/site-assets/banners/banner-1-desktop.jpg',
  'https://fdfgwfdvxgjwgycyubxs.supabase.co/storage/v1/object/public/site-assets/banners/banner-1-mobile.jpg',
  true,
  0
),
(
  'Projetos Comerciais',
  'Soluções para seu negócio',
  'https://fdfgwfdvxgjwgycyubxs.supabase.co/storage/v1/object/public/site-assets/banners/banner-2-desktop.jpg',
  'https://fdfgwfdvxgjwgycyubxs.supabase.co/storage/v1/object/public/site-assets/banners/banner-2-mobile.jpg',
  true,
  1
);