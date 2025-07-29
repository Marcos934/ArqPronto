-- Insert mock promotional projects
UPDATE projetos
SET promocao_ativa = true,
    preco_promocional = preco * 0.8,
    promocao_inicio = CURRENT_TIMESTAMP,
    promocao_fim = CURRENT_TIMESTAMP + INTERVAL '30 days'
WHERE id IN (
    SELECT id
    FROM projetos
    WHERE status = 'ativo'
    ORDER BY RANDOM()
    LIMIT 6
);

-- Mark some projects as featured
UPDATE projetos
SET destaque = true
WHERE id IN (
    SELECT id
    FROM projetos
    WHERE status = 'ativo'
      AND promocao_ativa = false
    ORDER BY RANDOM()
    LIMIT 4
);

-- Update creation dates for some projects to make them appear as recent
UPDATE projetos
SET created_at = CURRENT_TIMESTAMP - (RANDOM() * INTERVAL '7 days')
WHERE id IN (
    SELECT id
    FROM projetos
    WHERE status = 'ativo'
      AND promocao_ativa = false
      AND destaque = false
    ORDER BY RANDOM()
    LIMIT 3
);