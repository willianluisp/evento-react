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
import EventoDetalhe from "./paginas/backend/EventoDetalhe";

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
  const showTopBar = location.pathname === "/home";
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
              onEditarEvento={editarEvento}
            />
          }
        />

        <Route path="/sobre" element={<Sobre />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/agendas" element={<Agendas eventos={eventos} />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/evento/:id" element={<EventoDetalhe eventos={eventos} />} />

        <Route
          path="/CadastrarEvento"
          element={
            <CadastrarEvento onAdd={adicionarEvento} onEdit={editarEvento} />
          }
        />

        <Route path="/Login" element={<Login />} />
      </Routes>

{/* ================== BOTTOM NAV ==================== */}
{!isLoginPage && 
 location.pathname !== "/CadastrarEvento" && 
 location.pathname !== "/Login" && 
 !location.pathname.startsWith("/evento/") && 
  (
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
      capacidadeTotal: Number(1250),
      fotos: ["data:image/jpeg;base64,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"]
    },
    {
      id: 2,
      titulo: "Mundo Senai",
      data: "2026-11-05",
      local: "Escola Sesi Senai",
      descricao: "Evento Mundo Senai na Escola Sesi Senai, com exposições de projetos e atividades interativas para estudantes.",
      editado: false,
      status: "aberto",
      fotos: ["data:image/jpeg;base64,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"]
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
    if (window.confirm("Tem certeza que deseja remover todos os eventos?")) {
      setEventos([])
    }
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