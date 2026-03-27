// Importação dos estilos globais
import "./styles.css";

// Importações do React Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

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
import MudarNome from "./paginas/backend/GerenciarNome"; 
import GerenciarEmail from "./paginas/backend/GerenciarEmail"; 
import GerenciarSenha from "./paginas/backend/GerenciarSenha"; 

// Componentes fixos
import BottomNav from "./componentes/backend/BottomNav";
import TopBar from "./componentes/backend/TopBar";

// Ícones do Material Icons
import "material-icons/iconfont/material-icons.css";

// ✅ Conecta com a API do backend
import { useEventosService } from "./service/eventosService";


// ==================================================================
// ====================== COMPONENTE LAYOUT ==========================
// ==================================================================

function Layout({ eventos, adicionarEvento, editarEvento, onRemover, onRemoverTodos, carregando, erro }) {
  const location = useLocation();

  const [busca, setBusca] = useState("");
  const [filtroLocal, setFiltroLocal] = useState("");

  const isLoginPage = location.pathname === "/";
  const showTopBar = location.pathname === "/home";
  const showSobreButton = location.pathname === "/perfil";

  // ✅ Páginas que escondem o BottomNav
  const hideBottomNav =
    isLoginPage ||
    location.pathname === "/CadastrarEvento" ||
    location.pathname === "/Login" ||
    location.pathname === "/mudar-nome" || // ✅ NOVO
    location.pathname === "/gerenciar-email" || // ✅ NOVO
    location.pathname === "/gerenciar-senha" || // ✅ NOVO
    location.pathname.startsWith("/evento/");

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
            carregando ? (
              <p style={{ textAlign: "center", marginTop: "2rem" }}>Carregando eventos...</p>
            ) : erro ? (
              <p style={{ textAlign: "center", color: "red", marginTop: "2rem" }}>
                Erro ao carregar eventos: {erro}
              </p>
            ) : (
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
            )
          }
        />

        <Route path="/sobre" element={<Sobre />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/agendas" element={<Agendas eventos={eventos} />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/evento/:id" element={<EventoDetalhe eventos={eventos} />} />
        <Route path="/gerenciar-nome" element={<MudarNome />} /> 
        <Route path="/gerenciar-email" element={<GerenciarEmail />} /> 
        <Route path="/gerenciar-senha" element={<GerenciarSenha />} /> 

        <Route
          path="/CadastrarEvento"
          element={
            <CadastrarEvento onAdd={adicionarEvento} onEdit={editarEvento} />
          }
        />

        <Route path="/Login" element={<Login />} />
      </Routes>

      {/* ================== BOTTOM NAV ==================== */}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}


// ==================================================================
// ========================== APP PRINCIPAL ==========================
// ==================================================================

export default function App() {
  const {
    eventos,
    carregando,
    erro,
    adicionarEvento,
    editarEvento,
    removerEvento,
    removerTodos,
  } = useEventosService();

  return (
    <Router>
      <Layout
        eventos={eventos}
        carregando={carregando}
        erro={erro}
        adicionarEvento={adicionarEvento}
        editarEvento={editarEvento}
        onRemover={removerEvento}
        onRemoverTodos={removerTodos}
      />
    </Router>
  );
}
