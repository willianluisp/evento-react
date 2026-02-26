import React, { useState, useEffect } from "react";
import "../frontend/cadastrarEvento.css";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../../componentes/backend/Modal";

export default function CadastroEvento({ onAdd, onEdit }) {

  const navigate = useNavigate();
  const location = useLocation();

  const eventoParaEditar = location.state?.eventoParaEditar;

  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("aberto");
  const [open, setOpen] = useState(false); // modal

  // 🔹 Preenche os campos se estiver editando  
  useEffect(() => {
    if (eventoParaEditar) {
      setTitulo(eventoParaEditar.titulo);
      setData(eventoParaEditar.data);
      setLocal(eventoParaEditar.local);
      setDescricao(eventoParaEditar.descricao || "");
      setStatus(eventoParaEditar.status || "aberto");
    }
  }, [eventoParaEditar]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!titulo || !data || !local || !descricao) {
      alert("Preencha todos os campos");
      return;
    }

    if (eventoParaEditar) {
      onEdit({
        ...eventoParaEditar,
        titulo,
        data,
        local,
        descricao,
        status,
        editado: true
      });
    } else {
      onAdd({
        titulo,
        data,
        local,
        descricao,
        status,
        editado: false
      });
    }

    setOpen(true); // abre modal
  }

  function limparCampos() {
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setStatus("aberto");
  }

  return (
    <div className="page-wrapper">
      <div className="cadastrarEvento-container">

        <h2>
          {eventoParaEditar ? "Editar Evento" : "Cadastrar Evento"}
        </h2>

        <form onSubmit={handleSubmit} className="form-evento">

          <label>Título</label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />

          <label>Data</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />

          <label>Local</label>
          <input value={local} onChange={(e) => setLocal(e.target.value)} />

          <label>Descrição</label>
          <input value={descricao} onChange={(e) => setDescricao(e.target.value)} />

          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="aberto">Aberto</option>
            <option value="lotado">Lotado</option>
          </select>

          <div className="botoes">

            <button
              type="button"
              className="btn-voltar"
              onClick={() => navigate("/home")}
            >
              Voltar
            </button>

            <button type="submit" className="btn-salvar">
              {eventoParaEditar ? "Atualizar" : "Salvar"}
            </button>

            <button
              type="button"
              className="btn-limpar"
              onClick={limparCampos}
            >
              Limpar Campos
            </button>
          </div>
        </form>

        {/* Modal de sucesso */}
        <Modal open={open} onClose={() => navigate("/home")}>
          <h2>
            {eventoParaEditar
              ? "Evento atualizado com sucesso!"
              : "Evento cadastrado com sucesso!"}
          </h2>
        </Modal>

      </div>
    </div>
  );
}