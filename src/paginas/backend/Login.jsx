import React, { useState } from "react"; // <- adiciona o useState
import { useNavigate } from "react-router-dom";
import "../frontend/Login.css";

function Login() {

    const navigate = useNavigate();

    // Guarda o que o usuário digita
    const [form, setForm] = useState({
        email: "",
        senha: ""
    });

    // Controla se a senha está visível ou não
    const [mostrarSenha, setMostrarSenha] = useState(false);

    // Guarda mensagem de erro
    const [erro, setErro] = useState("");

    // Toda vez que o usuário digita, atualiza o campo certo
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleLogin() {
        // Verifica se os campos estão preenchidos
        if (!form.email || !form.senha) {
            setErro("Preencha todos os campos.");
            return;
        }

        setErro("");
        navigate("/home");
    }

    return (
        <main className="tela-login">

            {/* Fundo */}
            <img 
                src="/images/Fundo-login.png" 
                alt="Fundo"
                className="fundo"
            />

            {/* Conteúdo */}
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

                {/* Campo senha com botão de olho */}
                <label>Senha</label>
                <div className="input-senha">
                    <input
                        type={mostrarSenha ? "text" : "password"} // <- troca entre text e password
                        name="senha"
                        placeholder="Digite sua senha"
                        value={form.senha}
                        onChange={handleChange}
                    />
                    {/* Clicando no olho, alterna mostrar/esconder */}
                    <span onClick={() => setMostrarSenha(!mostrarSenha)}>
                        {mostrarSenha
                            ? <span className="material-icons search-icon" style={{top: "-5px"}}>visibility_off</span>
                            : <span className="material-icons search-icon" style={{top: "-5px"}}>visibility</span>}
                    </span>
                </div>

                {/* Só aparece se tiver algum erro */}
                {erro && <p className="erro">{erro}</p>}

                <button onClick={handleLogin} id="btnLogin">Entrar</button>
            </div>
        </main>
    );
}

export default Login;