import React, { useState } from "react";
import "../frontend/TelaCadastro.css";
import { useNavigate } from "react-router-dom";

function TelaCadastro() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        usuario: "",   // <- corrigido de "nome" para "usuario"
        senha: "",
        confirmarSenha: "",
    });

    const [erro, setErro] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function validarSenha(senha) {
        if (senha.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
        if (!/[A-Z]/.test(senha)) return "A senha deve ter pelo menos uma letra maiúscula.";
        if (!/[0-9]/.test(senha)) return "A senha deve ter pelo menos um número.";
        return null;
    }

    async function handleCadastrar() {
        if (!form.usuario || !form.email || !form.senha || !form.confirmarSenha) {
            setErro("Preencha todos os campos.");
            return;
        }

        const erroSenha = validarSenha(form.senha);
        if (erroSenha) {
            setErro(erroSenha);
            return;
        }

        if (form.senha !== form.confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        try {
            const resposta = await fetch("http://localhost:3001/cadastrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    usuario: form.usuario,
                    email: form.email,
                    senha: form.senha
                })
            });

            const dados = await resposta.json();

            if (dados.sucesso) {
                navigate("/home");
            } else {
                setErro(dados.mensagem);
            }
        } catch (erro) {
            setErro("Erro ao conectar com o servidor.");
        }
    }   // <- fecha aqui, sem mais nada depois

    function irParaTelaLogin() {
        navigate("/Login");
    }

    return (
        <main className="tela-cadastro">
            <img 
                src="/images/Fundo-login.png" 
                alt="Fundo"
                className="fundo"
            />

            <div className="card">
                <h1><b>Mawr EventHub</b></h1>

                <label>E-mail</label>
                <input type="email" name="email" placeholder="Digite seu e-mail"
                    value={form.email} onChange={handleChange} />

                <label>Usuário</label>
                <input type="text" name="usuario" placeholder="Digite seu usuário"
                    value={form.usuario} onChange={handleChange} />

                <label>Senha</label>
                <div className="input-senha">
                    <input
                        type={mostrarSenha ? "text" : "password"}
                        name="senha"
                        placeholder="Digite sua senha"
                        value={form.senha}
                        onChange={handleChange}
                    />
                    <span onClick={() => setMostrarSenha(!mostrarSenha)}>
                        {mostrarSenha
                            ? <span className="material-icons search-icon" style={{top: "-5px"}}>visibility_off</span>
                            : <span className="material-icons search-icon" style={{top: "-5px"}}>visibility</span>}
                    </span>
                </div>

                <label>Confirmar Senha</label>
                <div className="input-senha">
                    <input
                        type={mostrarConfirmar ? "text" : "password"}
                        name="confirmarSenha"
                        placeholder="Confirme sua senha"
                        value={form.confirmarSenha}
                        onChange={handleChange}
                    />
                    <span onClick={() => setMostrarConfirmar(!mostrarConfirmar)}>
                        {mostrarConfirmar
                            ? <span className="material-icons search-icon" style={{top: "-5px"}}>visibility_off</span>
                            : <span className="material-icons search-icon" style={{top: "-5px"}}>visibility</span>}
                    </span>
                </div>

                {erro && <p className="erro">{erro}</p>}

                <button onClick={handleCadastrar}>Cadastrar</button>

                <a 
                    href="/Login" 
                    className="Login" 
                    onClick={(e) => {
                        e.preventDefault(); 
                        irParaTelaLogin();
                    }}
                >
                    Já tem uma conta ?
                </a>
            </div>
        </main>
    );
}

export default TelaCadastro;