CREATE TABLE projetos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  tipo ENUM('residencial', 'comercial') NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  area DECIMAL(10,2) NOT NULL,
  imagens JSON NOT NULL,
  detalhes JSON NOT NULL,
  especificacoes_tecnicas JSON NOT NULL,
  areas_internas JSON NOT NULL,
  inclusos JSON NOT NULL,
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;