import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./paginas/Home";
import Sobre from "./paginas/Sobre";
import Promocoes from "./paginas/Promocoes";
import Agendas from "./paginas/Agendas";
import BottomNav from "./componentes/BottomNav";
import Calendario from "./paginas/Calendario";
import "material-icons/iconfont/material-icons.css"; // Importa os ícones do Google Material Icons
                                                     //mas primeiro tem que instalar com: npm install material-icons
import TopBar from "./componentes/TopBar"; 


function App() {
  return (
    <Router>
      <div className="app">
        <TopBar />
       {/*<Header /> */}




        {/* Menu de navegação */}
        <nav>
        <Link to="/sobre" className="b2">Sobre</Link>
        </nav>




        {/* Definição das rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/promocoes" element={<Promocoes />} />
          <Route path="/agendas" element={<Agendas />} />
        </Routes>



        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
