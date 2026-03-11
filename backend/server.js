const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o PostgreSQL
const pool = new Pool({
    user: "postgres",          // usuário do pgAdmin
    host: "localhost",
    database: "cadastro_eventos",
    password: "root",     // <- coloca sua senha aqui
    port: 5432,
});

// Rota de teste
app.get("/", (req, res) => {
    res.json({ mensagem: "Backend funcionando!" });
});

// Rota de cadastro
app.post("/cadastrar", async (req, res) => {
    const { usuario, email, senha } = req.body;

    console.log("Dados recebidos:", usuario, email, senha); // <- mostra o que chegou

    try {
        await pool.query(
            "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
            [usuario, email, senha]
        );
        res.json({ sucesso: true, mensagem: "Usuário cadastrado com sucesso!" });
    } catch (erro) {
        console.log("Erro ao cadastrar:", erro.message); // <- mostra o erro real
        res.status(400).json({ sucesso: false, mensagem: "Email ou usuário já cadastrado." });
    }
});

// Rota de login
app.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    console.log("Tentativa de login:", email); // <- mostra o que chegou

    try {
        const resultado = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1 AND senha = $2",
            [email, senha]
        );

        if (resultado.rows.length > 0) {
            res.json({ sucesso: true, mensagem: "Login realizado com sucesso!" });
        } else {
            res.status(401).json({ sucesso: false, mensagem: "Email ou senha incorretos." });
        }
    } catch (erro) {
        console.log("Erro no login:", erro.message); // <- mostra o erro real
        res.status(500).json({ sucesso: false, mensagem: "Erro no servidor." });
    }
});

// Inicia o servidor
app.listen(3001, () => {
    console.log("Backend rodando em http://localhost:3001");
});