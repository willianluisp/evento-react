import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EventoDetalhe({ eventos }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const evento = eventos.find((e) => e.id === parseInt(id));

  // Função para formatar data (YYYY-MM-DD → DD/MM/YYYY)
  function formatarData(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  if (!evento) {
    return (
      <section className="detalhe-container">
        <div className="detalhe-card">
          <h2>Evento não encontrado</h2>
          <button className="btn voltar" onClick={() => navigate("/home")}>
            Voltar para Eventos
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="detalhe-container">

      <button className="btn voltar" onClick={() => navigate("/home")}>
        ← Voltar
      </button>

      <div className="detalhe-card">

        <h2 className="detalhe-titulo">{evento.titulo}</h2>

        {/* Status */}
        <div className={`status ${evento.status === "fechado" ? "fechado" : "aberto"}`}>
          {evento.status || "aberto"}
        </div>

        <div className="detalhe-info">
          <span className="label">📅 Data</span>
          <p>{formatarData(evento.data)}</p>
        </div>

        <div className="detalhe-info">
          <span className="label">📍 Local</span>
          <p>{evento.local}</p>
        </div>

        <div className="detalhe-info">
          <span className="label">📝 Descrição</span>
          <p>{evento.descricao || "Sem descrição disponível."}</p>
        </div>

    
      {/* ✅ Capacidade */}
      {evento.capacidadeTotal && (
          <div>
            <strong>👥 Capacidade Total:</strong>
            <p>{evento.capacidadeTotal}</p>
          </div>
        )}

        {/* ✅ Mapa */}
        {evento.mapaUrl && (
          <div>
            <strong>🗺️ Localização:</strong>
            <p>
              <a 
                href={evento.mapaUrl} 
                target="_blank" 
                rel="noreferrer"
              >
                Ver no mapa
              </a>
            </p>
          </div>
        )}

        {/* ✅ Fotos */}
        {evento.fotos && evento.fotos.length > 0 && (
          <div>
            <strong>📷 Fotos:</strong>
            <div 
              style={{ 
                display: "grid", 
                gap: "10px", 
                marginTop: "10px" 
              }}
            >
              {evento.fotos.map((foto, index) => (
                <img
                  key={index}
                  src={foto}
                  alt={`Foto ${index + 1}`}
                  style={{ 
                    width: "100%", 
                    borderRadius: "8px" 
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}