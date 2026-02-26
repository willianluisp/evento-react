import React from "react";
import Evento from "../../componentes/backend/Evento";

function Home({ total, primeiroEvento, eventos, onRemover, onRemoverTodos, busca, filtroLocal }) {

  const eventosFiltrados = eventos.filter((evento) => {
    const correspondeTitulo = evento.titulo.toLowerCase().includes(busca.toLowerCase());
    const correspondeLocal = evento.local.toLowerCase().includes(filtroLocal.toLowerCase());
    return correspondeTitulo && correspondeLocal;
  });

  return (
    <main>

      <h1 style={{ color: '#053f81' }}>Bem vindo ao <b>MAWR EventHub</b></h1>
      <p style={{ color: '#053f81' }}>Aqui você fica por dentro de todos os eventos.</p>

      <div className="box">
        Total de eventos cadastrados: <strong>{total}</strong>
      </div>
      <div className="box">
        Evento mais próximo: <strong>{primeiroEvento}</strong>
      </div>

      <button className="btn danger" id="btnRemover2" onClick={onRemoverTodos}>
        Remover Todos os Eventos
      </button>

      <div className="eventos-container">
        {eventosFiltrados.length === 0 ? (
          <p style={{ color: '#053f81' }}>Nenhum evento encontrado.</p>
        ) : (
          eventosFiltrados.map((evento) => (
            <div className="quadrado-evento" key={evento.id}>

              <Evento
                nome={evento.titulo}
                data={evento.data}
                local={evento.local}
                descricao={evento.descricao}
              />
              <button className="btn danger" id="btnRemover" onClick={() => onRemover(evento.id)}>
              Remover Evento
              </button>
            </div>
          ))
        )}
        
      </div>

    </main>
  );
}

export default Home;