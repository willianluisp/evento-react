import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../frontend/Login.css";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        senha: ""
    });

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erro, setErro] = useState("");

    // fecha corretamente com }
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // fora do handleChange agora
    async function handleLogin() {
        if (!form.email || !form.senha) {
            setErro("Preencha todos os campos.");
            return;
        }

        try {
            const resposta = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
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
    }

    return (
        <main className="tela-login">
            <img 
                src="/images/Fundo-login.png" 
                alt="Fundo"
                className="fundo"
            />

            <div className="TelaLogin">
                <div className="voltar-btn" onClick={() => navigate(-1)}>
                    <span className="material-icons" style={{ color: "#053f81", fontSize: '32px'}}>
                        arrow_back
                    </span>
                </div>

                <h1><b>Mawr EventHub</b></h1>

                <label>E-mail</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    value={form.email}
                    onChange={handleChange}
                />

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

                {erro && <p className="erro">{erro}</p>}

                <button onClick={handleLogin} id="btnLogin">Entrar</button>
            </div>
        </main>
    );
}

export default Login;