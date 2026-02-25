import React, { useState } from "react";
import "../frontend/cadastrarEvento.css";
import { useNavigate } from "react-router-dom";
import Modal from "../../componentes/backend/Modal";

function CadastrarEvento() {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  
  // Estado que controla o modal aberto ou fechado
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  function Enviar(e) {
    e.preventDefault();

    // Aqui você NÃO salva nada, só "simula"
    // Limpa os campos (opcional)
    setNome("");
    setData("");
    setLocal("");

    // Abre o modal
    setOpen(true);
  }

  return (
    <div className="page-wrapper">
      <div className="cadastrarEvento-container">

        <div className="voltar-btn" onClick={() => navigate(-1)}>
          <span className="material-icons" style={{ color: "#053f81" }}>
            arrow_back
          </span>
        </div>

        <h2>Cadastrar Evento</h2>

        <form onSubmit={Enviar} className="form-evento">
          <label style={{ color: "#053f81" }}>Título do Evento:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label style={{ color: "#053f81" }}>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />

          <label style={{ color: "#053f81" }}>Local:</label>
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            required
          />

          <button type="submit" className="btn-salvar">
            Salvar Evento
          </button>

          <button
            type="button"
            className="btn-salvar"
            onClick={() => navigate("/Perfil")}
          >
            Voltar
          </button>
        </form>

        {/* Modal que aparece após clicar em salvar */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <h2>Evento cadastrado com sucesso!</h2>
          <p>Seu evento foi salvo (simulação).</p>
        </Modal>
      </div>
    </div>
  );
}

export default CadastrarEvento;
