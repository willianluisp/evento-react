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

// Importação das suas páginas
import Home from "./paginas/Home";
import Sobre from "./paginas/Sobre";
import Promocoes from "./paginas/Promocoes";
import Agendas from "./paginas/Agendas";
import Perfil from "./paginas/Perfil"; // <-- IMPORTANTE

// Componentes fixos
import BottomNav from "./componentes/BottomNav";
import TopBar from "./componentes/TopBar";

// Ícones do Material Icons
import "material-icons/iconfont/material-icons.css";

// ==================================================================
// ======================   COMPONENTE LAYOUT   ======================
// ==================================================================
//
// O Layout controla:
//  ✔️ Se a TopBar aparece (somente na Home)
//  ✔️ Se o botão Sobre aparece (somente no Perfil)
//  ✔️ Rotas
//  ✔️ BottomNav
//
// Aqui é onde usamos useLocation(), que NÃO podia ser usado no App.
// ==================================================================

function Layout() {
  const location = useLocation(); // Descobre a rota atual

  // TopBar só aparece na Home
  const showTopBar = location.pathname === "/";

  // Botão Sobre só aparece no Perfil
  const showSobreButton = location.pathname === "/perfil";

  return (
    <div className="app">

      {/* TopBar só na home */}
      {showTopBar && <TopBar />}

      {/* Botão "Sobre" só na página Perfil */}
      {showSobreButton && (
        <nav>
          <Link to="/sobre" className="b2">Sobre</Link>
        </nav>
      )}

      {/* Suas rotas principais */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/agendas" element={<Agendas />} />
        <Route path="/perfil" element={<Perfil />} /> {/* <-- ROTA DO PERFIL */}
      </Routes>

      {/* Menu inferior fixo */}
      <BottomNav />
    </div>
  );
}


// ==================================================================
// ========================   COMPONENTE APP   ========================
// ==================================================================
//
// O App só cria o Router e renderiza o Layout.
// O erro anterior era tentar controlar a TopBar dentro do App,
// que está acima do Router e não pode usar useLocation.
// ==================================================================

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}