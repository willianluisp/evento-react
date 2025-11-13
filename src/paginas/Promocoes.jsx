import Evento from "../componentes/Evento";
import "./Promocoes.css";


function Promocoes() {
    return (
        <main>
            <h1>Promoções Especiais</h1>
            <p>Aproveite as melhores promoções para os próximos eventos!</p>

                  {/* Imagem da promocao SENAI */}
      <br />
      <p>Clique aqui para saber mais 👇</p>
      <img 
        src="/senai-promocao.jpg"     // Caminho para a imagem do logo (pasta public)
        className="promocao"          // Classe CSS para estilizar a imagem
        onClick={() => window.open("https://sc.senai.br/descontos", "_blank")}
        style={{ cursor: 'pointer' }}
      />

        </main>

    );
}
export default Promocoes;