import React, { useState } from "react";
import "./cadastrarEvento.css";
import { useNavigate } from "react-router-dom";

function CadastrarEvento({ onCadastrar }) {

  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const navigate = useNavigate();

  function Enviar(e) {
    e.preventDefault();

    const novoEvento = {
      id: Date.now(),
      nome,
      data,
      local,
    };

    onCadastrar(novoEvento);

    setNome("");
    setData("");
    setLocal("");
  }

  return (
    <div className="page-wrapper">

    <div className="cadastrarEvento-container">

      {/* Ícone de voltar no canto superior esquerdo */}
      <div className="voltar-btn" onClick={() => navigate(-1)}>
        <span className="material-icons" style={{color:'#053f81'}}>arrow_back</span>
      </div>

      <h2>Cadastrar Evento</h2>

      <form onSubmit={Enviar} className="form-evento">
        
        <label style={{color:'#053f81'}}>Título do Evento:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        /> 

        <label style={{color:'#053f81'}}>Data:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />

        <label style={{color:'#053f81'}}>Local:</label>
        <input
          type="text"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          required
        />

        <button type="submit" className="btn-salvar">Salvar Evento</button>
        <button type="button" className="btn-salvar" onClick={() => navigate("/Perfil")}>Voltar</button>

      </form>
    </div>
    </div>
  );
}

export default CadastrarEvento;
