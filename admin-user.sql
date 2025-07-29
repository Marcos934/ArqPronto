-- Criar tabela de usuários admin (caso não exista)
CREATE TABLE IF NOT EXISTS usuarios_admin (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir usuário admin (senha: 123)
-- A senha está com hash bcrypt para maior segurança
INSERT INTO usuarios_admin (nome, email, senha) VALUES (
  'Marcos',
  'marcos@gmail.com',
  '$2a$10$8DGFx3H3.UH89WJgw/X9.OqLdvyVUxwQOGhJPsYd.zrRwFKcZPKpW'
);