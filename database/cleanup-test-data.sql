-- Reset promotional fields
UPDATE projetos
SET promocao_ativa = false,
    preco_promocional = NULL,
    promocao_inicio = NULL,
    promocao_fim = NULL,
    destaque = false;

-- Reset creation dates to original values
UPDATE projetos
SET created_at = updated_at
WHERE created_at > updated_at;

-- Clean up any orphaned data
DELETE FROM projetos
WHERE status = 'inativo'
  AND updated_at < CURRENT_TIMESTAMP - INTERVAL '90 days';