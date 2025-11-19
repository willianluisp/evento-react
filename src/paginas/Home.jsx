//Importa o componente 'Evento' que será utilizado dentro deste componente.
import Evento from "../componentes/Evento";

//criando função Home 
function Home() {
  return (
    <main>

    <h1 style={{ color: '#053f81' }}>Bem vindo ao <b>MAWR EventHub</b></h1>
    <p  style={{ color: '#053f81' }}>Aqui você fica por dentro dos eventos.</p>

      {/* Exibindo os eventos*/}
      {/* Container para exibir os eventos lado a lado */}
      <div className="eventos-container">
        <div className="quadrado-evento">
        <Evento nome="Mundo Senai" data="05/11/2025" local="Auditório Sesi Senai"/>
        </div>
        <div className="quadrado-evento">
        <Evento nome="Agro Chaaama" data="06/12/2025" local="Parque Efapi" />
        </div>
        <div className="quadrado-evento">
        <Evento nome="Palestra" data="05/12/2025" local="Unoesc" />
        </div>
      </div>
    </main>
  );
}
//Exportando para quando for usar em um componente ou em outro arquivo
export default Home;
