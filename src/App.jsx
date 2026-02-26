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

function Layout({ eventos, adicionarEvento, editarEvento, onRemover, onRemoverTodos }) {
  const location = useLocation();

  const [busca, setBusca] = useState("");
  const [filtroLocal, setFiltroLocal] = useState("");

  const isLoginPage = location.pathname === "/";
  const showTopBar = location.pathname === "/home" && !isLoginPage;
  const showSobreButton = location.pathname === "/perfil";

  return (
    <div className="app">

      {/* ==================== TOPBAR ==================== */}
      {showTopBar && (
        <TopBar
          busca={busca}
          setBusca={setBusca}
          filtroLocal={filtroLocal}
          setFiltroLocal={setFiltroLocal}
        />
      )}

      {/* ================= BOTÃO SOBRE (Página Perfil) ================= */}
      {showSobreButton && (
        <nav>
          <Link to="/sobre" className="b2">Sobre</Link>
        </nav>
      )}

      {/* ===================== ROTAS ===================== */}
      <Routes>
        <Route path="/" element={<TelaCadastro />} />

        <Route
          path="/home"
          element={
            <Home
              total={eventos.length}
              primeiroEvento={eventos[eventos.length - 1]?.titulo}
              eventos={eventos}
              onRemover={onRemover}
              onRemoverTodos={onRemoverTodos}
              busca={busca}
              filtroLocal={filtroLocal}
            />
          }
        />

        <Route path="/sobre" element={<Sobre />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/agendas" element={<Agendas eventos={eventos} />} />
        <Route path="/perfil" element={<Perfil />} />

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
      id: 3,
      titulo: "Review da Sprint",
      data: "2026-02-13",
      local: "Auditório",
      descricao: "Apresentação dos resultados da sprint",
      editado: false,
      status: "lotado",
    },
  ]);

  function adicionarEvento(novo) {
    const eventoComId = { id: Date.now(), ...novo, editado: false };
    setEventos((lista) => [eventoComId, ...lista]);
  }

  function editarEvento(eventoEditado) {
    setEventos((lista) =>
      lista.map((e) =>
        e.id === eventoEditado.id
          ? { ...eventoEditado, editado: true }
          : e
      )
    );
  }

  function removerEvento(id) {
    setEventos((lista) => lista.filter((e) => e.id !== id));
  }

  function removerTodos() {
    setEventos([]);
  }

  return (
    <Router>
      <Layout
        eventos={eventos}
        adicionarEvento={adicionarEvento}
        editarEvento={editarEvento}
        onRemover={removerEvento}
        onRemoverTodos={removerTodos}
      />
    </Router>
  );
}