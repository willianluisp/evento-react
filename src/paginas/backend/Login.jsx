import React from "react";
import { useNavigate } from "react-router-dom"; // IMPORTAR NAVIGATE    
import "../frontend/Login.css";

function Login() {

    const navigate = useNavigate();

    function handleLogin() {
        // Aqui você pode validar os campos antes, se quiser
        navigate("/home");            // << redireciona para Home
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
            <div className="TelaLogin" >

            <div className="voltar-btn" onClick={() => navigate(-1)}>
          <span className="material-icons" style={{ color: "#053f81", fontSize: '32px'}}>
            arrow_back
          </span>
        </div>

            <h1><b>Mawr EventHub</b></h1>


                <input type="email" placeholder="E-mail" />
                <input type="password" placeholder="Senha" />

                <button onClick={handleLogin} id="btnLogin">Entrar</button>
            </div>
        </main>
    );
}

export default Login;
