// Importa o React (obrigatório para componentes React)
import React from "react";

// Importa os hooks do React Router
// useNavigate → muda de página
// useLocation → verifica em qual página o usuário está (para marcar o item ativo)
import { useNavigate, useLocation } from "react-router-dom";

// Importa o arquivo CSS do menu inferior
import "./BottomNav.css";

export default function BottomNav() {
  const navigate = useNavigate();     // Função para mudar de rota
  const location = useLocation();     // Mostra o caminho atual (ex: "/promocoes")

  return (
    <nav className="bottom-nav">

      {/* ====== BOTÃO INÍCIO ====== */}
      {/* Se a rota atual for "/", adiciona a classe 'active' */}
      <div
        className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
        onClick={() => navigate("/")}
      >
        <span className="material-icons">home</span>
        <p>Início</p>
      </div>

      {/* ====== BOTÃO PROMOÇÕES ====== */}
      {/* Se a rota atual for "/promocoes", adiciona a classe 'active' */}
      <div
        className={`nav-item ${location.pathname === "/promocoes" ? "active" : ""}`}
        onClick={() => navigate("/promocoes")}
      >
        <span className="material-icons">local_offer</span>
        <p>Promoções</p>
      </div>

      {/* ====== BOTÃO AGENDAS ====== */}
      <div
        className={`nav-item ${location.pathname === "/agendas" ? "active" : ""}`}
        onClick={() => navigate("/agendas")}
      >
        <span className="material-icons">event</span>
        <p>Agendas</p>
      </div>

      {/* ====== BOTÃO PERFIL ====== */}
      <div
        className={`nav-item ${location.pathname === "/perfil" ? "active" : ""}`}
        onClick={() => navigate("/perfil")}
      >
        <span className="material-icons">person</span>
        <p>Perfil</p>
      </div>

    </nav>
  );
}
