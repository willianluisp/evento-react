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

// Importação das páginas
import Home from "./paginas/Home";
import Sobre from "./paginas/Sobre";
import Promocoes from "./paginas/Promocoes";
import Agendas from "./paginas/Agendas";
import Perfil from "./paginas/Perfil";
import CadastrarEvento from "./paginas/CadastrarEvento";
import TelaCadastro from "./paginas/TelaCadastro";
import TelaLogin from "./paginas/TelaLogin";

// Componentes fixos
import BottomNav from "./componentes/BottomNav";
import TopBar from "./componentes/TopBar";

// Ícones do Material Icons
import "material-icons/iconfont/material-icons.css";


// ==================================================================
// ====================== COMPONENTE LAYOUT ==========================
// ==================================================================
//
// Aqui é onde decidimos:
//  ✔ Quando mostrar TopBar
//  ✔ Quando mostrar BottomNav
//  ✔ Quando mostrar o botão Sobre
//  ✔ Quais páginas podem aparecer
//
// O Layout consegue fazer isso porque podemos usar useLocation()
// para detectar QUAL página está sendo exibida.
// ==================================================================

function Layout() {
  const location = useLocation(); // identifica a rota atual

  //  VERIFICAÇÃO MAIS IMPORTANTE DO PROJETO
  // Se estiver no "/", significa que estamos na tela de login
  const isLoginPage = location.pathname === "/";

  // TopBar só aparece na Home — e nunca no login
  const showTopBar = location.pathname === "/home" && !isLoginPage;

  // O botão Sobre só aparece no Perfil
  const showSobreButton = location.pathname === "/perfil";

  return (
    <div className="app">

      {/* ==================== TOPBAR ==================== */}
      {/* Só aparece na Home e NÃO aparece no Login */}
      {showTopBar && <TopBar />}


      {/* ================= BOTÃO SOBRE (Página Perfil) ================= */}
      {showSobreButton && (
        <nav>
          <Link to="/sobre" className="b2">Sobre</Link>
        </nav>
      )}


      {/* ===================== ROTAS ===================== */}
      <Routes>
        {/* 🔥 LOGIN — é a primeira página e não mostra nenhum menu */}
        <Route path="/" element={<TelaCadastro />} />

        {/* Outras telas */}
        <Route path="/home" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/agendas" element={<Agendas />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/CadastrarEvento" element={<CadastrarEvento />} />
      </Routes>


      {/* ================== BOTTOM NAV ==================== */}
      {/* NÃO aparece no login e NÃO aparece em CadastrarEvento */}
      {!isLoginPage && location.pathname !== "/CadastrarEvento" && (
        <BottomNav />
      )}

    </div>
  );
}



// ==================================================================
// ========================== APP WRAPPER ============================
// ==================================================================
//
// O App apenas cria o Router e coloca o Layout dentro dele.
// Nada mais precisa ser mexido aqui.
// ==================================================================

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
