-- Reset any existing promotional data
UPDATE projetos
SET promocao_ativa = false,
    preco_promocional = NULL,
    promocao_inicio = NULL,
    promocao_fim = NULL,
    destaque = false;

-- Set promotional projects (20% discount)
WITH promotional_projects AS (
  SELECT id 
  FROM projetos 
  WHERE status = 'ativo' 
  ORDER BY RANDOM() 
  LIMIT 6
)
UPDATE projetos
SET 
  promocao_ativa = true,
  preco_promocional = preco * 0.8,
  promocao_inicio = NOW(),
  promocao_fim = NOW() + INTERVAL '30 days'
WHERE id IN (SELECT id FROM promotional_projects);

-- Set featured projects
WITH featured_projects AS (
  SELECT id 
  FROM projetos 
  WHERE status = 'ativo' 
    AND promocao_ativa = false
  ORDER BY RANDOM() 
  LIMIT 4
)
UPDATE projetos
SET destaque = true
WHERE id IN (SELECT id FROM featured_projects);

-- Set recent projects
WITH recent_projects AS (
  SELECT id 
  FROM projetos 
  WHERE status = 'ativo'
    AND promocao_ativa = false
    AND destaque = false
  ORDER BY RANDOM() 
  LIMIT 3
)
UPDATE projetos
SET created_at = NOW() - (RANDOM() * INTERVAL '7 days')
WHERE id IN (SELECT id FROM recent_projects);