-- Drop existing tables if they exist
DROP TABLE IF EXISTS projetos;
DROP TABLE IF EXISTS usuarios_admin;

-- Create admin users table
CREATE TABLE usuarios_admin (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create projects table
CREATE TABLE projetos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  tipo ENUM('residencial', 'comercial') NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  area DECIMAL(10,2) NOT NULL,
  imagens JSON NOT NULL COMMENT '[string]',
  detalhes JSON NOT NULL COMMENT '{
    quartos: number,
    suites: number,
    banheiros: number,
    vagas: number,
    closets: number,
    areaGourmet: boolean,
    pavimentos: number,
    andares: number,
    estilo: string
  }',
  especificacoes_tecnicas JSON NOT NULL COMMENT '{
    areaTotal: number,
    larguraCasa: number,
    profundidadeCasa: number,
    areaTerreno: number,
    larguraTerreno: number,
    profundidadeTerreno: number
  }',
  areas_internas JSON NOT NULL COMMENT '{
    sala: number,
    cozinha: number,
    lavanderia: number,
    areaGourmet: number,
    banheiros: number
  }',
  inclusos JSON NOT NULL COMMENT '[string]',
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_tipo (tipo),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;