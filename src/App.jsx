// Importação dos estilos globais
import "./styles.css";
import React, { useState } from "react";

// Importações do React Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

// Importação das páginas
import Home from "./paginas/backend/Home";
import Sobre from "./paginas/backend/Sobre";
import Promocoes from "./paginas/backend/Promocoes";
import Agendas from "./paginas/backend/Agendas";
import Perfil from "./paginas/backend/Perfil";
import CadastrarEvento from "./paginas/backend/CadastrarEvento";
import TelaCadastro from "./paginas/backend/TelaCadastro";
import Login from "./paginas/backend/Login";

// Componentes fixos
import BottomNav from "./componentes/backend/BottomNav";
import TopBar from "./componentes/backend/TopBar";

// Ícones do Material Icons
import "material-icons/iconfont/material-icons.css";


// ==================================================================
// ====================== COMPONENTE LAYOUT ==========================
// ==================================================================

function Layout({ eventos, adicionarEvento, editarEvento, removerEvento }) {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";
  const isLoginPageAlt = location.pathname === "/Login";

  const showTopBar = location.pathname === "/home" && !isLoginPage;
  const showSobreButton = location.pathname === "/perfil";

  return (
    <div className="app">

      {/* ==================== TOPBAR ==================== */}
      {showTopBar && <TopBar />}

      {/* ================= BOTÃO SOBRE (Página Perfil) ================= */}
      {showSobreButton && (
        <nav>
          <Link to="/sobre" className="b2">Sobre</Link>
        </nav>
      )}

      {/* ===================== ROTAS ===================== */}
      <Routes>
        {/* LOGIN — primeira página, sem menu */}
        <Route path="/" element={<TelaCadastro />} />

        {/* Home recebe total e nome do último evento */}
        <Route
          path="/home"
          element={
            <Home
              total={eventos.length}
              primeiroEvento={eventos[eventos.length - 1]?.titulo}
              eventos={eventos}
            />
          }
        />

        <Route path="/sobre" element={<Sobre />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/agendas" element={<Agendas />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* CadastrarEvento recebe as funções de adicionar e editar */}
        <Route
          path="/CadastrarEvento"
          element={
            <CadastrarEvento onAdd={adicionarEvento} onEdit={editarEvento} />
          }
        />

        <Route path="/Login" element={<Login />} />
      </Routes>

      {/* ================== BOTTOM NAV ==================== */}
      {!isLoginPage && location.pathname !== "/CadastrarEvento" && (
        <BottomNav />
      )}

    </div>
  );
}


// ==================================================================
// ========================== APP PRINCIPAL ==========================
// ==================================================================

export default function App() {
  // Estado com a lista de eventos
  const [eventos, setEventos] = useState([
    {
      id: 1,
      titulo: "Agro Chaaama",
      data: "2026-12-06",
      local: "Parque Efapi",
      descricao: "Evento Agro Chaaama no Parque Efapi, com palestras e workshops sobre agricultura sustentável.",
      editado: false,
      status: "aberto",
    },
    {
      id: 2,
      titulo: "Mundo Senai",
      data: "2026-11-05",
      local: "Escola Sesi Senai",
      descricao: "Evento Mundo Senai na Escola Sesi Senai, com exposições de projetos e atividades interativas para estudantes.",
      editado: false,
      status: "aberto",
    },
    {
      id: 3, // id do evento
      titulo: "Review da Sprint", // Titulo do evento 
      data: "2026-02-13", // Titulo do evento
      local: "Auditório", // Local do evento
      descricao: "Apresentação dos resultados da sprint", // Descrição do evento 
      editado: false, //  mostrar se esta editado ou não
      status: "lotado" // Adicionar status
    },
  ]);

  // Adiciona um novo evento no início da lista
  function adicionarEvento(novo) {
    const eventoComId = { id: Date.now(), ...novo, editado: false };
    setEventos((lista) => [eventoComId, ...lista]);
  }

  // Edita um evento existente e marca como editado
  function editarEvento(eventoEditado) {
    setEventos((lista) =>
      lista.map((e) =>
        e.id === eventoEditado.id
          ? { ...eventoEditado, editado: true }
          : e
      )
    );
  }

  // Remove um evento pelo id
  function removerEvento(id) {
    setEventos((lista) => lista.filter((e) => e.id !== id));
  }

  return (
    <Router>
      <Layout
        eventos={eventos}
        adicionarEvento={adicionarEvento}
        editarEvento={editarEvento}
        removerEvento={removerEvento}
      />
    </Router>
  );
}