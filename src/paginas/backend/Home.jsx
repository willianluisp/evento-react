import React from "react";
import Evento from "../../componentes/backend/Evento";
import { Link, useNavigate } from "react-router-dom";

function Home({ 
  total, 
  primeiroEvento, 
  eventos, 
  onRemover, 
  onRemoverTodos, 
  busca, 
  filtroLocal, 
  onEditarEvento 
}) {
  
  const navigate = useNavigate(); 

  const eventosFiltrados = eventos.filter((evento) => {
    const correspondeTitulo = evento.titulo
      .toLowerCase()
      .includes(busca.toLowerCase());

    const correspondeLocal = evento.local
      .toLowerCase()
      .includes(filtroLocal.toLowerCase());

    return correspondeTitulo && correspondeLocal;
  });

  // Função para navegar para a página de cadastro com os dados do evento
  function navegarParaEditar(evento) {
    // Navega para /CadastrarEvento passando os dados do evento via state
    navigate("/CadastrarEvento", { state: { eventoParaEditar: evento } });
  }

    // Função para formatar data (YYYY-MM-DD → DD/MM/YYYY)
  function formatarData(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <main>

      <h1 style={{ color: '#053f81' }}>
        Bem vindo ao <b>MAWR EventHub</b>
      </h1>

      <p style={{ color: '#053f81' }}>
        Aqui você fica por dentro de todos os eventos.
      </p>

      <div className="box">
        Total de eventos cadastrados: <strong>{total}</strong>
      </div>

      <div className="box">
        Evento mais próximo: <strong>{primeiroEvento}</strong>
      </div>

      <button 
        className="btn danger" 
        id="btnRemover2" 
        onClick={onRemoverTodos}
      >
        Remover Todos os Eventos
      </button>

      <div className="eventos-container">
        {eventosFiltrados.length === 0 ? (
          <p style={{ color: '#053f81' }}>
            Nenhum evento encontrado.
          </p>
        ) : (
          eventosFiltrados.map((evento) => (
            <div className="quadrado-evento" key={evento.id}>

              {/* Cabeçalho do card: badges + título */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.4rem",
                marginBottom: "0.8rem"
              }}>

                {/* Linha das badges */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  flexWrap: "wrap"
                }}>

                  {/* Badge de status - sempre aparece */}
                  <span
                    style={{
                      fontSize: "0.75rem",
                      // se status for "aberto" usa verde, senão usa vermelho
                      backgroundColor: evento.status === "aberto" ? "#28a745" : "#dc3545",
                      color: "#fff",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {/* se status for "aberto" mostra ✓ Aberto, senão mostra ✕ Lotado */}
                    {evento.status === "aberto" ? "✓ Aberto" : "✕ Lotado"}
                  </span>

                  {/* Badge "Editado" - só aparece se o evento foi editado */}
                  {evento.editado && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        backgroundColor: "#ffc107",
                        color: "#000",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "10px",
                        fontWeight: "bold"
                      }}
                    >
                      Editado
                    </span>
                  )}
                </div>

                {/* Título centralizado abaixo das badges */}
                <h3 style={{ margin: 0 }}>{evento.titulo}</h3>

              </div>

              <Evento
                data={formatarData(evento.data)}
                local={evento.local}
                descricao={evento.descricao}
              />

{evento.fotos && evento.fotos.length > 0 && (
  <img
    src={evento.fotos[0]}
    alt={evento.titulo}
    style={{
      width: "100%",
      height: "200px",
      objectFit: "cover",
      display: "block"
    }}
  />
)}

              <div className="botoes">

                {/* Linha de cima: Ver Detalhes + Editar */}
                <div className="botoes-topo">

                  <Link
                    to={`/evento/${evento.id}`}
                    className="btn"
                    id="btnDetalhes"
                    style={{ textDecoration: "none" }}
                  >
                    Ver Detalhes
                  </Link>

                  <button
                    className="btn"
                    id="btnEditar"
                    onClick={() => navegarParaEditar(evento)}
                  >
                    Editar Evento
                  </button>

                </div>
              </div>
              
              {/* Linha de baixo: Remover */}
              <button
                  className="btn danger"
                  id="btnRemover"
                  onClick={() => onRemover(evento.id)}
                >
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