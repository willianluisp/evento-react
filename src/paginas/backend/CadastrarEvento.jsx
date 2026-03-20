import React, { useState, useEffect } from "react";
import "../frontend/cadastrarEvento.css";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../../componentes/backend/Modal";

export default function CadastroEvento({ onAdd, onEdit }) {

  const navigate = useNavigate();
  const location = useLocation();

  // Se o usuário clicou em "Editar" em algum evento, ele chega aqui com os dados
  const eventoParaEditar = location.state?.eventoParaEditar;

  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("aberto");
  const [capacidadeTotal, setCapacidadeTotal] = useState("");
  const [mapaUrl, setMapaUrl] = useState("");
  const [fotosTexto, setFotosTexto] = useState("");
  const [open, setOpen] = useState(false);

  // Quando abre no modo edição, preenche os campos com os dados do evento
  useEffect(() => {
    if (eventoParaEditar) {
      setTitulo(eventoParaEditar.titulo);
      setData(eventoParaEditar.data);
      setLocal(eventoParaEditar.local);
      setDescricao(eventoParaEditar.descricao || "");
      setStatus(eventoParaEditar.status || "aberto");
      setCapacidadeTotal(eventoParaEditar.capacidadeTotal || "");
      setMapaUrl(eventoParaEditar.mapaUrl || "");
      setFotosTexto(eventoParaEditar.fotos?.join("\n") || "");
    }
  }, [eventoParaEditar]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!titulo || !data || !local || !descricao) {
      alert("Preencha todos os campos");
      return;
    }

    const fotos = fotosTexto
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "");

    let resultado;

    if (eventoParaEditar) {
      // Modo edição
      resultado = await onEdit({
        ...eventoParaEditar,
        titulo,
        data,
        local,
        descricao,
        status,
        capacidadeTotal: Number(capacidadeTotal),
        mapaUrl,
        fotos,
        editado: true,
      });
    } else {
      // Modo criação
      resultado = await onAdd({
        titulo,
        data,
        local,
        descricao,
        status,
        capacidadeTotal: Number(capacidadeTotal),
        vagasRestantes: Number(capacidadeTotal),
        mapaUrl,
        fotos,
        editado: false,
      });
    }

    // Só abre o modal se a API retornou sucesso (resultado não é null)
    if (resultado) {
      setOpen(true);
    }
  }

  function limparCampos() {
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setStatus("aberto");
    setCapacidadeTotal("");
    setMapaUrl("");
    setFotosTexto("");
  }

  return (
    <div className="page-wrapper">
      <div className="cadastrarEvento-container">

        <h2>{eventoParaEditar ? "Editar Evento" : "Cadastrar Evento"}</h2>

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
            <option value="fechado">Fechado</option>
            <option value="lotado">Lotado</option>
          </select>

          <label>Capacidade Total</label>
          <input
            type="number"
            min="0"
            value={capacidadeTotal}
            onChange={(e) => setCapacidadeTotal(e.target.value)}
            placeholder="Ex: 100"
          />

          <label>Mapa (link do Google Maps)</label>
          <input
            type="url"
            value={mapaUrl}
            onChange={(e) => setMapaUrl(e.target.value)}
            placeholder="https://maps.google.com/..."
          />

          <label>Fotos (1 URL por linha)</label>
          <textarea
            value={fotosTexto}
            onChange={(e) => setFotosTexto(e.target.value)}
            placeholder={"https://site.com/foto1.jpg\nhttps://site.com/foto2.jpg"}
            rows={4}
          />

          <div className="botoes">
            <button type="button" className="btn-voltar" onClick={() => navigate("/home")}>
              Voltar
            </button>
            <button type="submit" className="btn-salvar">
              {eventoParaEditar ? "Atualizar" : "Salvar"}
            </button>
            <button type="button" className="btn-limpar" onClick={limparCampos}>
              Limpar Campos
            </button>
          </div>
        </form>

        {/* Abre somente se a API confirmou o sucesso */}
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
