-- =============================================
-- BANCO DE DADOS - CADASTRO DE EVENTOS
-- =============================================

-- Tabela: Usuário
CREATE TABLE usuario (
    id          SERIAL PRIMARY KEY,
    nome        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL UNIQUE,
    senha       VARCHAR(100) NOT NULL
);

-- ============================
-- TABELA: eventos
-- ============================
CREATE TABLE IF NOT EXISTS eventos (
    id_eventos        SERIAL PRIMARY KEY,
    titulo            VARCHAR(100) NOT NULL,
    data              DATE NOT NULL,
    local             VARCHAR(100) NOT NULL,
    descricao         TEXT,
    status            VARCHAR(10) CHECK (status IN ('aberto', 'fechado')) DEFAULT 'aberto',
    capacidade_total  INTEGER NOT NULL,
    mapa_url          VARCHAR(200)
);
 
-- ============================
-- TABELA: foto
-- ============================
CREATE TABLE IF NOT EXISTS foto (
    id_foto    SERIAL PRIMARY KEY,
    foto_url   VARCHAR(200) NOT NULL,
    eventos_id INTEGER NOT NULL,
    CONSTRAINT fk_foto_eventos FOREIGN KEY (eventos_id) REFERENCES eventos(id_eventos) ON DELETE CASCADE
);
