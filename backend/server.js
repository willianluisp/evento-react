// Importando as bibliotecas necessárias
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// Permite que o frontend se conecte com o backend
app.use(cors());

// Permite receber dados em JSON
app.use(express.json());

// Conexão com o banco PostgreSQL
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cadastro_eventos",
    password: "root",
    port: 5432,
});

// Rota simples apenas para testar se o backend está funcionando
app.get("/", (req, res) => {
    res.json({ mensagem: "Backend funcionando!" });
});


// ============================
// ROTA DE CADASTRO DE USUÁRIO
// ============================
app.post("/cadastrar", async (req, res) => {

    const { usuario, email, senha } = req.body;
    console.log("Dados recebidos:", usuario, email, senha);

    try {
        await pool.query(
            "INSERT INTO usuarios (usuario, email, senha) VALUES ($1, $2, $3)",
            [usuario, email, senha]
        );
        res.json({ sucesso: true, mensagem: "Usuário cadastrado com sucesso!" });

    } catch (erro) {
        console.log("Erro ao cadastrar:", erro.message);
        res.status(400).json({ sucesso: false, mensagem: "Email ou usuário já cadastrado." });
    }
});


// ============================
// ROTA DE LOGIN
// ============================
app.post("/login", async (req, res) => {

    const { email, senha } = req.body;
    console.log("Tentativa de login:", email);

    try {
        const resultado = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1 AND senha = $2",
            [email, senha]
        );

        if (resultado.rows.length > 0) {
            const usuario = resultado.rows[0];
            res.json({
                sucesso: true,
                mensagem: "Login realizado com sucesso!",
                usuario: usuario.usuario,
                id: usuario.id  // ✅ ADICIONADO: envia o id para o frontend salvar
            });
        } else {
            res.status(401).json({ sucesso: false, mensagem: "Email ou senha incorretos." });
        }

    } catch (erro) {
        console.log("Erro no login:", erro.message);
        res.status(500).json({ sucesso: false, mensagem: "Erro no servidor." });
    }
});


// ============================
// ROTA DE MUDAR NOME DE USUÁRIO  ✅ NOVO
// ============================
app.put("/usuario/:id/nome", async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({ erro: "Nome inválido." });
    }

    try {
        const resultado = await pool.query(
            "UPDATE usuarios SET usuario = $1 WHERE id = $2 RETURNING id, usuario",
            [nome.trim(), id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        res.json({ mensagem: "Nome atualizado com sucesso!", usuario: resultado.rows[0] });

    } catch (erro) {
        console.log("Erro ao atualizar nome:", erro.message);
        res.status(500).json({ erro: "Erro interno no servidor." });
    }
});


// ============================
// ROTA DE MUDAR EMAIL  ✅ NOVO
// ============================
app.put("/usuario/:id/email", async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    if (!email || email.trim() === "") {
        return res.status(400).json({ erro: "E-mail inválido." });
    }

    try {
        // Verifica se o email já está em uso por outro usuário
        const emailExiste = await pool.query(
            "SELECT id FROM usuarios WHERE email = $1 AND id != $2",
            [email.trim(), id]
        );

        if (emailExiste.rows.length > 0) {
            return res.status(400).json({ erro: "Este e-mail já está em uso." });
        }

        const resultado = await pool.query(
            "UPDATE usuarios SET email = $1 WHERE id = $2 RETURNING id, email",
            [email.trim(), id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        res.json({ mensagem: "E-mail atualizado com sucesso!", usuario: resultado.rows[0] });

    } catch (erro) {
        console.log("Erro ao atualizar email:", erro.message);
        res.status(500).json({ erro: "Erro interno no servidor." });
    }
});


// ============================
// ROTA DE MUDAR SENHA  ✅ NOVO
// ============================
app.put("/usuario/:id/senha", async (req, res) => {
    const { id } = req.params;
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha) {
        return res.status(400).json({ erro: "Preencha todos os campos." });
    }

    try {
        // Verifica se a senha atual está correta
        const resultado = await pool.query(
            "SELECT id FROM usuarios WHERE id = $1 AND senha = $2",
            [id, senhaAtual]
        );

        if (resultado.rows.length === 0) {
            return res.status(401).json({ erro: "Senha atual incorreta." });
        }

        // Atualiza para a nova senha
        await pool.query(
            "UPDATE usuarios SET senha = $1 WHERE id = $2",
            [novaSenha, id]
        );

        res.json({ mensagem: "Senha atualizada com sucesso!" });

    } catch (erro) {
        console.log("Erro ao atualizar senha:", erro.message);
        res.status(500).json({ erro: "Erro interno no servidor." });
    }
});


// ============================
// ROTAS DE EVENTOS
// ============================

// GET /eventos — Lista todos os eventos com suas fotos
app.get("/eventos", async (req, res) => {
    try {
        const { rows: eventos } = await pool.query(
            "SELECT * FROM eventos ORDER BY data ASC"
        );

        const eventosComFotos = await Promise.all(
            eventos.map(async (evento) => {
                const { rows: fotos } = await pool.query(
                    "SELECT foto_url FROM foto WHERE eventos_id = $1",
                    [evento.id_eventos]
                );
                return {
                    id: evento.id_eventos,
                    titulo: evento.titulo,
                    data: evento.data,
                    local: evento.local,
                    descricao: evento.descricao,
                    status: evento.status,
                    capacidadeTotal: evento.capacidade_total,
                    mapaUrl: evento.mapa_url,
                    fotos: fotos.map((f) => f.foto_url),
                    editado: false,
                };
            })
        );

        res.json(eventosComFotos);

    } catch (erro) {
        console.log("Erro ao listar eventos:", erro.message);
        res.status(500).json({ sucesso: false, mensagem: "Erro ao listar eventos." });
    }
});


// POST /eventos — Cria um novo evento
app.post("/eventos", async (req, res) => {
    const { titulo, data, local, descricao, status, capacidadeTotal, mapaUrl, fotos } = req.body;

    if (!titulo || !data || !local || !capacidadeTotal) {
        return res.status(400).json({ sucesso: false, mensagem: "Preencha todos os campos obrigatórios." });
    }

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const { rows } = await client.query(
            `INSERT INTO eventos (titulo, data, local, descricao, status, capacidade_total, mapa_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [titulo, data, local, descricao, status || "aberto", capacidadeTotal, mapaUrl || null]
        );

        const novoEvento = rows[0];

        if (fotos && fotos.length > 0) {
            for (const url of fotos) {
                await client.query(
                    "INSERT INTO foto (foto_url, eventos_id) VALUES ($1, $2)",
                    [url, novoEvento.id_eventos]
                );
            }
        }

        await client.query("COMMIT");

        res.status(201).json({
            sucesso: true,
            evento: {
                id: novoEvento.id_eventos,
                titulo: novoEvento.titulo,
                data: novoEvento.data,
                local: novoEvento.local,
                descricao: novoEvento.descricao,
                status: novoEvento.status,
                capacidadeTotal: novoEvento.capacidade_total,
                mapaUrl: novoEvento.mapa_url,
                fotos: fotos || [],
                editado: false,
            }
        });

    } catch (erro) {
        await client.query("ROLLBACK");
        console.log("Erro ao criar evento:", erro.message);
        res.status(500).json({ sucesso: false, mensagem: "Erro ao criar evento." });
    } finally {
        client.release();
    }
});


// PUT /eventos/:id — Edita um evento existente
app.put("/eventos/:id", async (req, res) => {
    const { id } = req.params;
    const { titulo, data, local, descricao, status, capacidadeTotal, mapaUrl, fotos } = req.body;

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const { rows } = await client.query(
            `UPDATE eventos
             SET titulo = $1, data = $2, local = $3, descricao = $4,
                 status = $5, capacidade_total = $6, mapa_url = $7
             WHERE id_eventos = $8
             RETURNING *`,
            [titulo, data, local, descricao, status, capacidadeTotal, mapaUrl || null, id]
        );

        if (rows.length === 0) {
            await client.query("ROLLBACK");
            return res.status(404).json({ sucesso: false, mensagem: "Evento não encontrado." });
        }

        await client.query("DELETE FROM foto WHERE eventos_id = $1", [id]);

        if (fotos && fotos.length > 0) {
            for (const url of fotos) {
                await client.query(
                    "INSERT INTO foto (foto_url, eventos_id) VALUES ($1, $2)",
                    [url, id]
                );
            }
        }

        await client.query("COMMIT");

        const eventoAtualizado = rows[0];
        res.json({
            sucesso: true,
            evento: {
                id: eventoAtualizado.id_eventos,
                titulo: eventoAtualizado.titulo,
                data: eventoAtualizado.data,
                local: eventoAtualizado.local,
                descricao: eventoAtualizado.descricao,
                status: eventoAtualizado.status,
                capacidadeTotal: eventoAtualizado.capacidade_total,
                mapaUrl: eventoAtualizado.mapa_url,
                fotos: fotos || [],
                editado: true,
            }
        });

    } catch (erro) {
        await client.query("ROLLBACK");
        console.log("Erro ao editar evento:", erro.message);
        res.status(500).json({ sucesso: false, mensagem: "Erro ao editar evento." });
    } finally {
        client.release();
    }
});


// DELETE /eventos/:id — Remove um evento específico
app.delete("/eventos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount } = await pool.query(
            "DELETE FROM eventos WHERE id_eventos = $1",
            [id]
        );

        if (rowCount === 0) {
            return res.status(404).json({ sucesso: false, mensagem: "Evento não encontrado." });
        }

        res.json({ sucesso: true, mensagem: "Evento removido com sucesso." });

    } catch (erro) {
        console.log("Erro ao remover evento:", erro.message);
        res.status(500).json({ sucesso: false, mensagem: "Erro ao remover evento." });
    }
});


// DELETE /eventos — Remove TODOS os eventos
app.delete("/eventos", async (req, res) => {
    try {
        await pool.query("DELETE FROM eventos");
        res.json({ sucesso: true, mensagem: "Todos os eventos foram removidos." });
    } catch (erro) {
        console.log("Erro ao remover todos os eventos:", erro.message);
        res.status(500).json({ sucesso: false, mensagem: "Erro ao remover todos os eventos." });
    }
});


// Iniciando o servidor
app.listen(3001, () => {
    console.log("Backend rodando em http://localhost:3001");
});