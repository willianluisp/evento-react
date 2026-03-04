/*
-- ================================
-- BANCO DE DADOS - EVENTO-REACT
-- ================================

CREATE DATABASE cadastro_eventos;
\c cadastro_eventos

-- ================================
-- USUÁRIOS
-- ================================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT NOW()
);

-- Inserção
INSERT INTO usuarios (nome, email, senha) VALUES
    ('João Silva', 'joao@email.com', 'senha123'),

-- ================================
-- EVENTOS
-- ================================

-- fazer ainda
*/