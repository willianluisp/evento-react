import React, { useState } from 'react';
import './Calendario.css';

// Array com os eventos fixos
const eventos = [
  { id: 1, titulo: "Mundo Senai", data: "2025-11-05", local: "Auditório Sesi Senai" },
  { id: 2, titulo: "Agro Chaaama", data: "2025-12-06", local: "Parque Efapi" },
  { id: 3, titulo: "Palestra", data: "2025-12-22", local: "Unoesc" }
];

/**
 * Função auxiliar para gerar os dias de um mês específico
 */
const gerarDiasDoMes = (ano, mes) => {
  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0);
  const diasNoMes = ultimoDia.getDate();
  const diaInicioSemana = primeiroDia.getDay();

  const dias = [];
  
  for (let i = 0; i < diaInicioSemana; i++) {
    dias.push(null);
  }

  for (let i = 1; i <= diasNoMes; i++) {
    const dataAtual = new Date(ano, mes, i);
    const dataFormatada = dataAtual.toISOString().split('T')[0];
    
    const eventosDoDia = eventos.filter(evento => evento.data === dataFormatada);
    
    dias.push({
      numero: i,
      temEvento: eventosDoDia.length > 0,
      eventos: eventosDoDia
    });
  }

  return dias;
};

export const Calendario2025 = () => {

  const [mesAtual, setMesAtual] = useState(0);
  const [selectedEventos, setSelectedEventos] = useState([]);   /* ADICIONADO */

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const mesAnterior = () => {
    setMesAtual(prev => (prev === 0 ? 11 : prev - 1));
  };

  const proximoMes = () => {
    setMesAtual(prev => (prev === 11 ? 0 : prev + 1));
  };

  const dias = gerarDiasDoMes(2025, mesAtual);

  return (
    <div className="calendario-container">
      <div className="calendario-header">
        <button onClick={mesAnterior} className="nav-button">&lt;</button>
        <h2>{meses[mesAtual]} 2025</h2>
        <button onClick={proximoMes} className="nav-button">&gt;</button>
      </div>

      <div className="calendario">
        <div className="dias-semana">
          {diasSemana.map((dia, index) => (
            <div key={index} className="dia-semana">
              {dia}
            </div>
          ))}
        </div>

        <div className="dias-mes">
          {dias.map((dia, index) => (
            <div
              key={index}
              className={`dia 
                ${dia ? 'dia-valido' : 'dia-vazio'} 
                ${index % 7 === 0 || index % 7 === 6 ? 'fim-de-semana' : ''}
                ${dia && dia.temEvento ? 'com-evento' : ''}
              `}
              onClick={() => dia && dia.temEvento ? setSelectedEventos(dia.eventos) : null}   /* ADICIONADO */
            >
              <div className="numero-dia">{dia ? dia.numero : ''}</div>
              
              {dia && dia.temEvento && (
                <div className="eventos-dia">
                  {dia.eventos.map(evento => (
                    <div key={evento.id} className="evento-item">
                      <div className="evento-titulo">{evento.titulo}</div>
                      <div className="evento-local">{evento.local}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CONTAINER DOS EVENTOS CLICADOS — ADICIONADO */}
      <div className="container-eventos-clicados">
        <h3>Eventos Selecionados</h3>

        {selectedEventos.length === 0 ? (
          <p>Clique em um dia com evento</p>
        ) : (
          selectedEventos.map(ev => (
            <div key={ev.id} className="card-evento-clicado">
              <h4>{ev.titulo}</h4>
              <p><strong>Local:</strong> {ev.local}</p>
              <p><strong>Data:</strong> {ev.data}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
