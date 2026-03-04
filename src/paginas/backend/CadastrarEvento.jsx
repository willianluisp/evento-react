import React, { useState, useEffect } from "react";
import "../frontend/cadastrarEvento.css";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../../componentes/backend/Modal";

export default function CadastroEvento({ onAdd, onEdit }) {

  const navigate = useNavigate();
  const location = useLocation();

  // Se o usuário clicou em "Editar" em algum evento, ele chega aqui com os dados
  const eventoParaEditar = location.state?.eventoParaEditar;

  // Aqui ficam guardados os valores que o usuário digita no formulário
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("aberto");
  const [capacidadeTotal, setCapacidadeTotal] = useState(""); // quantas pessoas o evento comporta
  const [mapaUrl, setMapaUrl] = useState("");                 // link do local no Google Maps
  const [fotosTexto, setFotosTexto] = useState("");           // o usuário cola uma foto por linha
  const [open, setOpen] = useState(false);                    // controla se o modal aparece ou não

  // Quando o componente abre no modo edição, preenchemos os campos com os dados do evento
  useEffect(() => {
    if (eventoParaEditar) {
      setTitulo(eventoParaEditar.titulo);
      setData(eventoParaEditar.data);
      setLocal(eventoParaEditar.local);
      setDescricao(eventoParaEditar.descricao || "");
      setStatus(eventoParaEditar.status || "aberto");
      setCapacidadeTotal(eventoParaEditar.capacidadeTotal || "");
      setMapaUrl(eventoParaEditar.mapaUrl || "");
      // O array de fotos vira texto de novo para caber no textarea (1 por linha)
      setFotosTexto(eventoParaEditar.fotos?.join("\n") || "");
    }
  }, [eventoParaEditar]);

  function handleSubmit(e) {
    e.preventDefault();

    // Não deixa salvar se algum campo importante estiver vazio
    if (!titulo || !data || !local || !descricao) {
      alert("Preencha todos os campos");
      return;
    }

    // Cada linha do textarea vira uma foto; linhas em branco são ignoradas
    const fotos = fotosTexto
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "");

    if (eventoParaEditar) {
      // Modo edição: manda o evento atualizado para o App
      onEdit({
        ...eventoParaEditar,
        titulo,
        data,
        local,
        descricao,
        status,
        capacidadeTotal: Number(capacidadeTotal),
        mapaUrl,
        fotos,
        editado: true
      });
    } else {
      // Modo criação: as vagas começam iguais à capacidade total informada
      onAdd({
        titulo,
        data,
        local,
        descricao,
        status,
        capacidadeTotal: Number(capacidadeTotal),
        vagasRestantes: Number(capacidadeTotal),
        mapaUrl,
        fotos,
        editado: false
      });
    }

    // Tudo certo! Abre o modal de confirmação
    setOpen(true);
  }

  // Botão "Limpar Campos" — apaga tudo e começa do zero
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

        <h2>
          {eventoParaEditar ? "Editar Evento" : "Cadastrar Evento"}
        </h2>

        <form onSubmit={handleSubmit} className="form-evento">

          {/* Informações básicas do evento */}
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

          {/* Campos adicionados na Sprint 1 */}

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

          {/* O usuário cola aqui as URLs das fotos, uma em cada linha */}
          <label>Fotos (1 URL por linha)</label>
          <textarea
            value={fotosTexto}
            onChange={(e) => setFotosTexto(e.target.value)}
            placeholder={"https://site.com/foto1.jpg\nhttps://site.com/foto2.jpg"}
            rows={4}
          />

          <div className="botoes">

            {/* Desiste e volta para a lista de eventos */}
            <button
              type="button"
              className="btn-voltar"
              onClick={() => navigate("/home")}
            >
              Voltar
            </button>

            {/* Envia o formulário */}
            <button type="submit" className="btn-salvar">
              {eventoParaEditar ? "Atualizar" : "Salvar"}
            </button>

            {/* Apaga tudo nos campos */}
            <button
              type="button"
              className="btn-limpar"
              onClick={limparCampos}
            >
              Limpar Campos
            </button>

          </div>
        </form>

        {/* Aparece depois de salvar — ao fechar, volta pra home */}
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