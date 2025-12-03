import React from "react";
import "./TelaLogin.css";

function TelaLogin() {
    return (
        <main className="tela-Login">

            {/* Fundo */}
            <img 
                src="/Fundo-login.png" 
                alt="Fundo"
                className="fundo"
            />

            {/* Conteúdo */}
            <div className="card">

                <input type="email" placeholder="E-mail" />
                <input type="password" placeholder="Senha" />

                <button>Cadastrar</button>
            </div>
        </main>
    );
}

export default TelaLogin;
