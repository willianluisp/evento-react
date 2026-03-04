// src/paginas/Agendas.jsx
import React from 'react';
import { Calendario2025 } from './Calendario'; // Importe os componentes nomeados

const Agendas = () => {
  return (
    <div className="agendas-container">
      <h1>Agendas e Calendários</h1>
      
      {/* Se quiser usar o calendário com navegação */}
      <div className="calendario-section">
        <h2>Calendário 2025</h2>
        <Calendario2025 />
      </div>

    </div>
  );
};

// Exporte como componente nomeado
export default Agendas;