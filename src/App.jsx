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
      fotos: ["https://scontent.fcfc1-1.fna.fbcdn.net/v/t39.30808-6/429941565_409829841545644_7099876804759256464_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=ZePlWOf48l4Q7kNvwFOXdyE&_nc_oc=Adl4aMPE1wEUHbDZ6ySs30MZTI7binPTH-JPhZPcqBfytJxYWhUhGo3i3kEYBffz8NU&_nc_zt=23&_nc_ht=scontent.fcfc1-1.fna&_nc_gid=j91i3I21C9IJUnVNRNs5Zg&_nc_ss=8&oh=00_AfzLjGjRmmu5ZxiQJHrM3E4phR6DEp0JsWrRdq-Du6Jr5A&oe=69B7A751"]
    },
    {
      id: 2,
      titulo: "Mundo Senai",
      data: "2026-11-05",
      local: "Escola Sesi Senai",
      descricao: "Evento Mundo Senai na Escola Sesi Senai, com exposições de projetos e atividades interativas para estudantes.",
      editado: false,
      status: "aberto",
      fotos: ["https://tse2.mm.bing.net/th/id/OIP.KS0vnz0IbajNkSUjSeX10gHaNK?rs=1&pid=ImgDetMain&o=7&rm=3"]
    },
    {
      id: 3,
      titulo: "Review da Sprint",
      data: "2026-02-13",
      local: "Auditório",
      descricao: "Apresentação dos resultados da sprint",
      editado: false,
      status: "lotado",
      fotos: ["https://th.bing.com/th/id/R.c214d38613fd5d05c340a72d67674ba8?rik=UupPmyyXnfNqeg&pid=ImgRaw&r=0"]
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