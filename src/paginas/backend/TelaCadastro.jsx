import React from "react";
import "../frontend/TelaCadastro.css";
import { useNavigate } from "react-router-dom";

function TelaCadastro() {


    const navigate = useNavigate();   // << usar o hook

    function handleCadastrar() {
        // Aqui você pode validar os campos antes, se quiser
        navigate("/home");            // << redireciona para Home
    }

    function irParaTelaLogin() {
        navigate("/Login");
    }

    return (
        <main className="tela-cadastro">
            {/* Fundo */}
            <img 
                src="/images/Fundo-login.png" 
                alt="Fundo"
                className="fundo"
            />

            <h1><b>Mawr EventHub</b></h1>

            {/* Conteúdo */}
            <div className="card">
            <h1><b>Mawr EventHub</b></h1>
                <input type="email" placeholder="E-mail" />
                <input type="password" placeholder="Senha" />
                <input type="password" placeholder="Confirmar Senha" />
                <input type="text" placeholder="Nome Usuario" />

                {/* Botão com navegação */}
                <button onClick={handleCadastrar}>Cadastrar</button>

                {/* Link para login */}
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
