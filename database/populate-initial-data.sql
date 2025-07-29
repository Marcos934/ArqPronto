-- Insert initial projects data
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
  status,
  created_at,
  updated_at
) VALUES 
-- Projeto 1: Residência Moderna Vista Mar
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
  'ativo',
  NOW(),
  NOW()
),

-- Projeto 2: Casa Minimalista Urbana
(
  'Casa Minimalista Urbana',
  'Residência de 180m² com design minimalista, perfeita para terrenos urbanos de 12x25m. Integração total com área externa.',
  'residencial',
  980.00,
  180,
  '[
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=2065",
    "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&q=80&w=2070"
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
  'ativo',
  NOW(),
  NOW()
),

-- Projeto 3: Centro Empresarial Moderno
(
  'Centro Empresarial Moderno',
  'Edifício comercial com 2000m² distribuídos em 8 pavimentos. Design contemporâneo com fachada em vidro e acabamentos premium.',
  'comercial',
  3500.00,
  2000,
  '[
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2069",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069"
  ]',
  '{
    "quartos": 0,
    "suites": 0,
    "banheiros": 16,
    "vagas": 40,
    "closets": 0,
    "areaGourmet": true,
    "pavimentos": 8,
    "andares": 8,
    "estilo": "Contemporâneo"
  }',
  '{
    "areaTotal": 2000,
    "larguraCasa": 25,
    "profundidadeCasa": 40,
    "areaTerreno": 1000,
    "larguraTerreno": 25,
    "profundidadeTerreno": 40
  }',
  '{
    "sala": 1500,
    "cozinha": 100,
    "lavanderia": 50,
    "areaGourmet": 150,
    "banheiros": 200
  }',
  '[
    "Projeto arquitetônico completo",
    "Projeto estrutural",
    "Projeto de climatização",
    "Projeto de segurança",
    "Projeto de automação predial"
  ]',
  'ativo',
  NOW(),
  NOW()
),

-- Projeto 4: Residência Sustentável
(
  'Residência Sustentável',
  'Casa eco-friendly de 220m² com sistemas de energia solar e reaproveitamento de água. Ideal para terrenos de 15x30m.',
  'residencial',
  1100.00,
  220,
  '[
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=2080",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2070"
  ]',
  '{
    "quartos": 4,
    "suites": 2,
    "banheiros": 4,
    "vagas": 2,
    "closets": 2,
    "areaGourmet": true,
    "pavimentos": 2,
    "andares": 2,
    "estilo": "Contemporâneo Sustentável"
  }',
  '{
    "areaTotal": 220,
    "larguraCasa": 12,
    "profundidadeCasa": 18,
    "areaTerreno": 450,
    "larguraTerreno": 15,
    "profundidadeTerreno": 30
  }',
  '{
    "sala": 40,
    "cozinha": 22,
    "lavanderia": 8,
    "areaGourmet": 25,
    "banheiros": 16
  }',
  '[
    "Projeto arquitetônico sustentável",
    "Projeto de eficiência energética",
    "Sistema de captação de água",
    "Especificações de materiais ecológicos",
    "Consultoria em sustentabilidade"
  ]',
  'ativo',
  NOW(),
  NOW()
),

-- Projeto 5: Casa Mediterrânea
(
  'Casa Mediterrânea',
  'Residência de 250m² com influências mediterrâneas, pé direito alto e acabamentos nobres. Perfeita para terrenos de 15x35m.',
  'residencial',
  1350.00,
  250,
  '[
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=2070"
  ]',
  '{
    "quartos": 4,
    "suites": 3,
    "banheiros": 5,
    "vagas": 3,
    "closets": 3,
    "areaGourmet": true,
    "pavimentos": 2,
    "andares": 2,
    "estilo": "Mediterrâneo"
  }',
  '{
    "areaTotal": 250,
    "larguraCasa": 13,
    "profundidadeCasa": 19,
    "areaTerreno": 525,
    "larguraTerreno": 15,
    "profundidadeTerreno": 35
  }',
  '{
    "sala": 45,
    "cozinha": 25,
    "lavanderia": 10,
    "areaGourmet": 35,
    "banheiros": 25
  }',
  '[
    "Projeto arquitetônico detalhado",
    "Projeto estrutural",
    "Projeto hidráulico e elétrico",
    "Projeto de paisagismo",
    "Maquete eletrônica completa"
  ]',
  'ativo',
  NOW(),
  NOW()
),

-- Projeto 6: Chalé Contemporâneo
(
  'Chalé Contemporâneo',
  'Projeto de 200m² que mescla o aconchego dos chalés com toques contemporâneos. Ideal para terrenos de 15x30m.',
  'residencial',
  1150.00,
  200,
  '[
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=2084",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2075",
    "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&q=80&w=2075"
  ]',
  '{
    "quartos": 3,
    "suites": 2,
    "banheiros": 4,
    "vagas": 2,
    "closets": 2,
    "areaGourmet": true,
    "pavimentos": 2,
    "andares": 2,
    "estilo": "Chalé Contemporâneo"
  }',
  '{
    "areaTotal": 200,
    "larguraCasa": 11,
    "profundidadeCasa": 18,
    "areaTerreno": 450,
    "larguraTerreno": 15,
    "profundidadeTerreno": 30
  }',
  '{
    "sala": 38,
    "cozinha": 20,
    "lavanderia": 8,
    "areaGourmet": 25,
    "banheiros": 18
  }',
  '[
    "Projeto arquitetônico completo",
    "Projeto estrutural em madeira",
    "Projeto de instalações",
    "Detalhamento de interiores",
    "Imagens renderizadas"
  ]',
  'ativo',
  NOW(),
  NOW()
);