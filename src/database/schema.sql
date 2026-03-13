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

-- Tabela: Eventos
CREATE TABLE eventos (
    id_eventos        SERIAL PRIMARY KEY,
    titulo            VARCHAR(100) NOT NULL,
    data              DATE NOT NULL,
    local             VARCHAR(100) NOT NULL,
    descricao         TEXT,
    status            VARCHAR(10) CHECK (status IN ('aberto', 'fechado')) DEFAULT 'aberto',
    capacidade_total  INTEGER NOT NULL,
    mapa_url          VARCHAR(200)
);

-- Tabela: Foto (relacionada a Eventos - um evento pode ter várias fotos)
CREATE TABLE foto (
    id_foto    SERIAL PRIMARY KEY,
    foto_url   VARCHAR(200) NOT NULL,
    eventos_id INTEGER NOT NULL,
    CONSTRAINT fk_foto_eventos FOREIGN KEY (eventos_id) REFERENCES eventos(id_eventos) ON DELETE CASCADE
);

-- Tabela: Ingressos (relacionada a Eventos e Usuário)
CREATE TABLE ingressos (
    id_ingressos    SERIAL PRIMARY KEY,
    valor_ingresso  DECIMAL(10,2) NOT NULL,
    eventos_id      INTEGER NOT NULL,
    usuario_id      INTEGER NOT NULL,
    horario_compra  TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_ingressos_eventos FOREIGN KEY (eventos_id) REFERENCES eventos(id_eventos) ON DELETE CASCADE,
    CONSTRAINT fk_ingressos_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);