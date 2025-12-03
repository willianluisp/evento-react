import React from "react";
import "./TelaCadastro.css";
import { useNavigate } from "react-router-dom";

function TelaCadastro() {

    const navigate = useNavigate();   // << usar o hook

    function handleCadastrar() {
        // Aqui você pode validar os campos antes, se quiser
        navigate("/home");            // << redireciona para Home
    }

    return (
        <main className="tela-cadastro">
            {/* Fundo */}
            <img 
                src="/Fundo-login.png" 
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

                <a href="/login" style={{color:'#3b6ca8'}}>Já tem uma conta ?</a>
            </div>
        </main>
    );
}

export default TelaCadastro;
