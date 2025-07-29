-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projetos table if it doesn't exist
CREATE TABLE IF NOT EXISTS projetos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('residencial', 'comercial')),
  preco DECIMAL(10,2) NOT NULL,
  preco_original DECIMAL(10,2),
  preco_promocional DECIMAL(10,2),
  promocao_ativa BOOLEAN DEFAULT FALSE,
  promocao_inicio TIMESTAMPTZ,
  promocao_fim TIMESTAMPTZ,
  destaque BOOLEAN DEFAULT FALSE,
  area DECIMAL(10,2) NOT NULL,
  imagens JSONB NOT NULL DEFAULT '[]',
  detalhes JSONB NOT NULL,
  especificacoes_tecnicas JSONB NOT NULL,
  areas_internas JSONB NOT NULL,
  inclusos JSONB NOT NULL DEFAULT '[]',
  status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projetos_promocao 
ON projetos (promocao_ativa, promocao_inicio, promocao_fim);

CREATE INDEX IF NOT EXISTS idx_projetos_destaque 
ON projetos (destaque);

CREATE INDEX IF NOT EXISTS idx_projetos_created_status 
ON projetos (created_at, status);

-- Create function to handle promotion dates
CREATE OR REPLACE FUNCTION handle_promotion()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.promocao_ativa = true THEN
        -- Store original price if not set
        IF NEW.preco_original IS NULL THEN
            NEW.preco_original := NEW.preco;
        END IF;
    ELSE
        -- Clear promotion fields when inactive
        NEW.preco_promocional := NULL;
        NEW.promocao_inicio := NULL;
        NEW.promocao_fim := NULL;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for promotion handling
DROP TRIGGER IF EXISTS trigger_handle_promotion ON projetos;
CREATE TRIGGER trigger_handle_promotion
    BEFORE INSERT OR UPDATE ON projetos
    FOR EACH ROW
    EXECUTE FUNCTION handle_promotion();