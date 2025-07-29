-- Insert admin user (password: admin123 with bcrypt hash)
INSERT INTO usuarios_admin (nome, email, senha) VALUES (
  'Administrador',
  'admin@example.com',
  '$2a$10$8DGFx3H3.UH89WJgw/X9.OqLdvyVUxwQOGhJPsYd.zrRwFKcZPKpW'
);

-- Insert sample projects
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
  inclusos
) VALUES 
-- Projeto 1: Residência Moderna Vista Mar
(
  'Residência Moderna Vista Mar',
  'Projeto contemporâneo com 280m², ideal para terrenos de 15x30m. Design clean com amplos espaços integrados e vista privilegiada.',
  'residencial',
  1250.00,
  280,
  JSON_ARRAY(
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2075',
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&q=80&w=2075',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2070'
  ),
  JSON_OBJECT(
    'quartos', 4,
    'suites', 2,
    'banheiros', 5,
    'vagas', 3,
    'closets', 2,
    'areaGourmet', true,
    'pavimentos', 2,
    'andares', 2,
    'estilo', 'Contemporâneo'
  ),
  JSON_OBJECT(
    'areaTotal', 280,
    'larguraCasa', 12,
    'profundidadeCasa', 20,
    'areaTerreno', 450,
    'larguraTerreno', 15,
    'profundidadeTerreno', 30
  ),
  JSON_OBJECT(
    'sala', 45,
    'cozinha', 25,
    'lavanderia', 8,
    'areaGourmet', 30,
    'banheiros', 20
  ),
  JSON_ARRAY(
    'Projeto arquitetônico completo',
    'Projeto estrutural',
    'Projeto hidráulico',
    'Projeto elétrico',
    'Imagens 3D realistas'
  )
),

-- Projeto 2: Casa Minimalista Urbana
(
  'Casa Minimalista Urbana',
  'Residência de 180m² com design minimalista, perfeita para terrenos urbanos de 12x25m. Integração total com área externa.',
  'residencial',
  980.00,
  180,
  JSON_ARRAY(
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=2065',
    'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3?auto=format&fit=crop&q=80&w=2070'
  ),
  JSON_OBJECT(
    'quartos', 3,
    'suites', 1,
    'banheiros', 3,
    'vagas', 2,
    'closets', 1,
    'areaGourmet', true,
    'pavimentos', 1,
    'andares', 1,
    'estilo', 'Minimalista'
  ),
  JSON_OBJECT(
    'areaTotal', 180,
    'larguraCasa', 10,
    'profundidadeCasa', 18,
    'areaTerreno', 300,
    'larguraTerreno', 12,
    'profundidadeTerreno', 25
  ),
  JSON_OBJECT(
    'sala', 35,
    'cozinha', 20,
    'lavanderia', 6,
    'areaGourmet', 25,
    'banheiros', 12
  ),
  JSON_ARRAY(
    'Projeto completo',
    'Memorial descritivo',
    'Projeto de interiores básico',
    'Renderizações 3D',
    'Assessoria técnica'
  )
),

-- Projeto 3: Centro Empresarial Moderno
(
  'Centro Empresarial Moderno',
  'Edifício comercial com 2000m² distribuídos em 8 pavimentos. Design contemporâneo com fachada em vidro e acabamentos premium.',
  'comercial',
  3500.00,
  2000,
  JSON_ARRAY(
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2069',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2069'
  ),
  JSON_OBJECT(
    'quartos', 0,
    'suites', 0,
    'banheiros', 16,
    'vagas', 40,
    'closets', 0,
    'areaGourmet', true,
    'pavimentos', 8,
    'andares', 8,
    'estilo', 'Contemporâneo'
  ),
  JSON_OBJECT(
    'areaTotal', 2000,
    'larguraCasa', 25,
    'profundidadeCasa', 40,
    'areaTerreno', 1000,
    'larguraTerreno', 25,
    'profundidadeTerreno', 40
  ),
  JSON_OBJECT(
    'sala', 1500,
    'cozinha', 100,
    'lavanderia', 50,
    'areaGourmet', 150,
    'banheiros', 200
  ),
  JSON_ARRAY(
    'Projeto arquitetônico completo',
    'Projeto estrutural',
    'Projeto de climatização',
    'Projeto de segurança',
    'Projeto de automação predial'
  )
);