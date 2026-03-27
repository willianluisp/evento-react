import "../frontend/GerenciarNome.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MudarNome() {
  const navigate = useNavigate();

  const usuarioAtual = localStorage.getItem("usuario") || "";
  const usuarioId = localStorage.getItem("usuarioId");

  const [novoNome, setNovoNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSalvar() {
    setMensagem("");
    setErro("");

    if (!novoNome.trim()) {
      setErro("Por favor, insira um nome válido.");
      return;
    }

    if (novoNome.trim() === usuarioAtual) {
      setErro("O novo nome deve ser diferente do atual.");
      return;
    }

    if (!usuarioId) {
      setErro("Sessão inválida. Faça login novamente.");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch(
        `http://localhost:3001/usuario/${usuarioId}/nome`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: novoNome.trim() }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErro(data.erro || "Erro ao atualizar o nome.");
      } else {
        localStorage.setItem("usuario", novoNome.trim());
        setMensagem("Nome atualizado com sucesso!");
        setNovoNome("");

        setTimeout(() => navigate("/perfil"), 1500);
      }
    } catch (err) {
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="mudarnome-main">
      <div className="mudarnome-container">

        {/* BOTÃO VOLTAR */}
        <div className="mudarnome-voltar" onClick={() => navigate("/perfil")}>
          <span className="material-icons" style={{ color: '#3b6ca8', fontSize: '28px' }}>arrow_back</span>
          <span>Voltar</span>
        </div>

        {/* ÍCONE */}
        <div className="mudarnome-icone">
          <span className="material-icons">badge</span>
        </div>

        <h2 className="mudarnome-title">Mudar Nome de Usuário</h2>

        {/* NOME ATUAL */}
        <div className="mudarnome-card">
          <p className="mudarnome-label">Nome atual</p>
          <p className="mudarnome-nome-atual">{usuarioAtual || "—"}</p>
        </div>

        {/* INPUT NOVO NOME */}
        <div className="mudarnome-card">
          <p className="mudarnome-label">Novo nome</p>
          <input
            className="mudarnome-input"
            type="text"
            placeholder="Digite o novo nome..."
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            maxLength={100}
            onKeyDown={(e) => e.key === "Enter" && handleSalvar()}
          />
        </div>

        {/* MENSAGENS DE FEEDBACK */}
        {mensagem && <p className="mudarnome-sucesso">{mensagem}</p>}
        {erro && <p className="mudarnome-erro">{erro}</p>}

        {/* BOTÃO SALVAR */}
        <button
          className="mudarnome-btn"
          onClick={handleSalvar}
          disabled={carregando}
        >
          {carregando ? (
            <>
              <span className="material-icons spin">autorenew</span>
              Salvando...
            </>
          ) : (
            <>
              <span className="material-icons" style={{color: 'white'}}>save</span>
              Salvar Alteração
            </>
          )}
        </button>

      </div>
    </main>
  );
}

export default MudarNome;
