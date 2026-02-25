import Evento from "../../componentes/backend/Evento";

function Home({ total, primeiroEvento, eventos }) {
  return (
    <main>

      <h1 style={{ color: '#053f81' }}>Bem vindo ao <b>MAWR EventHub</b></h1>
      <p style={{ color: '#053f81' }}>Aqui você fica por dentro dos eventos.</p>

      <div className="box">
        Total de eventos cadastrados: <strong>{total}</strong>
      </div>
      <div className="box">
        Próximo evento: <strong>{primeiroEvento}</strong>
      </div>

      {/* Renderiza dinamicamente todos os eventos do App.jsx */}
      <div className="eventos-container">
        {eventos.map((evento) => (
          <div className="quadrado-evento" key={evento.id}>
            <Evento
              nome={evento.titulo}
              data={evento.data}
              local={evento.local}
              descricao={evento.descricao}
            />
          </div>
        ))}
      </div>

    </main>
  );
}

export default Home;