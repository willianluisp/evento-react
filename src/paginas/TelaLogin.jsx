import React from "react";
import { useNavigate } from "react-router-dom"; // IMPORTAR NAVIGATE    
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

                <button>Entrar</button>
            </div>
        </main>
    );
}

export default TelaLogin;
