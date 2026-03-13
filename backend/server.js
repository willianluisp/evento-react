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

    // Pegando os dados que vieram do frontend
    const { usuario, email, senha } = req.body;

    console.log("Dados recebidos:", usuario, email, senha);

    try {

        // Inserindo o usuário no banco de dados
        await pool.query(
            "INSERT INTO usuarios (usuario, email, senha) VALUES ($1, $2, $3)",
            [usuario, email, senha]
        );

        res.json({
            sucesso: true,
            mensagem: "Usuário cadastrado com sucesso!"
        });

    } catch (erro) {

        console.log("Erro ao cadastrar:", erro.message);

        res.status(400).json({
            sucesso: false,
            mensagem: "Email ou usuário já cadastrado."
        });

    }
});


// ============================
// ROTA DE LOGIN
// ============================
app.post("/login", async (req, res) => {

    // Pegando email e senha que vieram do frontend
    const { email, senha } = req.body;

    console.log("Tentativa de login:", email);

    try {

        // Procurando o usuário no banco
        const resultado = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1 AND senha = $2",
            [email, senha]
        );

        // Se encontrou um usuário
        if (resultado.rows.length > 0) {

            // Pegamos os dados do usuário
            const usuario = resultado.rows[0];

            res.json({
                sucesso: true,
                mensagem: "Login realizado com sucesso!",
                
                // Aqui estamos enviando o NOME do usuário para o frontend
                usuario: usuario.usuario
            });

        } else {

            res.status(401).json({
                sucesso: false,
                mensagem: "Email ou senha incorretos."
            });

        }

    } catch (erro) {

        console.log("Erro no login:", erro.message);

        res.status(500).json({
            sucesso: false,
            mensagem: "Erro no servidor."
        });

    }
});


// Iniciando o servidor
app.listen(3001, () => {
    console.log("Backend rodando em http://localhost:3001");
});
