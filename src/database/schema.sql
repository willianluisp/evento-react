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

-- ============================
-- DADOS DE EXEMPLO
-- ============================
INSERT INTO eventos (titulo, data, local, descricao, status, capacidade_total, mapa_url) VALUES
(
    'Agro Chaaama',
    '2026-12-06',
    'Parque Efapi',
    'Evento Agro Chaaama no Parque Efapi, com palestras e workshops sobre agricultura sustentável.',
    'aberto',
    1250,
    NULL
),
(
    'Mundo Senai',
    '2026-11-05',
    'Escola Sesi Senai',
    'Evento Mundo Senai na Escola Sesi Senai, com exposições de projetos e atividades interativas para estudantes.',
    'aberto',
    500,
    NULL
),
(
    'Review da Sprint',
    '2026-02-13',
    'Auditório',
    'Apresentação dos resultados da sprint.',
    'fechado',
    100,
    NULL
);
 
-- ============================
-- FOTOS DOS EVENTOS
-- ============================


-- alterar tabela para caber as fotos
ALTER TABLE foto ALTER COLUMN foto_url TYPE VARCHAR(500);


INSERT INTO foto (foto_url, eventos_id) VALUES
(
    'https://scontent.fcfc1-1.fna.fbcdn.net/v/t39.30808-6/429941565_409829841545644_7099876804759256464_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=ZePlWOf48l4Q7kNvwFOXdyE&_nc_oc=Adl4aMPE1wEUHbDZ6ySs30MZTI7binPTH-JPhZPcqBfytJxYWhUhGo3i3kEYBffz8NU&_nc_zt=23&_nc_ht=scontent.fcfc1-1.fna&_nc_gid=j91i3I21C9IJUnVNRNs5Zg&_nc_ss=8&oh=00_AfzLjGjRmmu5ZxiQJHrM3E4phR6DEp0JsWrRdq-Du6Jr5A&oe=69B7A751',
    1
),
(
    'https://tse2.mm.bing.net/th/id/OIP.KS0vnz0IbajNkSUjSeX10gHaNK?rs=1&pid=ImgDetMain&o=7&rm=3',
    2
),
(
    'https://th.bing.com/th/id/R.c214d38613fd5d05c340a72d67674ba8?rik=UupPmyyXnfNqeg&pid=ImgRaw&r=0',
    3
);


-- colocando as tabelas tipo TEXT para nao ter limite
ALTER TABLE eventos ALTER COLUMN mapa_url TYPE TEXT;
ALTER TABLE foto ALTER COLUMN foto_url TYPE TEXT;