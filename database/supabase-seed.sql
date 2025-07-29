-- Insert admin user (password: admin123)
INSERT INTO usuarios_admin (
  nome,
  email,
  senha,
  status
) VALUES (
  'Administrador',
  'admin@example.com',
  '$2a$10$8DGFx3H3.UH89WJgw/X9.OqLdvyVUxwQOGhJPsYd.zrRwFKcZPKpW',
  'ativo'
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
  inclusos,
  status
) VALUES 
(
  'Residência Moderna Vista Mar',
  'Projeto contemporâneo com 280m², ideal para terrenos de 15x30m. Design clean com amplos espaços integrados e vista privilegiada.',
  'residencial',
  1250.00,
  280,
  '[
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2075",
    "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&q=80&w=2075",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2070"
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
  'ativo'
);