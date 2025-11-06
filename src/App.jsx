import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import Home from "./paginas/Home";
import Sobre from "./paginas/Sobre";



function App() {
  return (
    <Router>
      <div className="app">
        <Header />




        {/* Menu de navegação */}
        <nav>
        <Link to="/" className="b1">Início</Link>
        <Link to="/sobre" className="b2">Sobre</Link>
        </nav>




        {/* Definição das rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>




        <Footer />
      </div>
    </Router>
  );
}

export default App;
