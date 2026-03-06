import React from 'react';
import { Calendario2025 } from './Calendario';

const Agendas = ({ eventos }) => {  // ← recebe eventos
  return (
    <div className="agendas-container">
      <h1>Agendas e Calendários</h1>
      
      <div className="calendario-section">
        <h2>Calendário 2026</h2>
        <Calendario2025 eventos={eventos} />  {/* ← passa eventos */}
      </div>
    </div>
  );
};

export default Agendas;