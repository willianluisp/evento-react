import "../frontend/GerenciarEmail.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GerenciarEmail() {
  const navigate = useNavigate();

  const usuarioId = localStorage.getItem("usuarioId");

  const [novoEmail, setNovoEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSalvar() {
    setMensagem("");
    setErro("");

    if (!novoEmail.trim() || !confirmarEmail.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!validarEmail(novoEmail.trim())) {
      setErro("Insira um e-mail válido.");
      return;
    }

    if (novoEmail.trim() !== confirmarEmail.trim()) {
      setErro("Os e-mails não coincidem.");
      return;
    }

    if (!usuarioId) {
      setErro("Sessão inválida. Faça login novamente.");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch(
        `http://localhost:3001/usuario/${usuarioId}/email`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: novoEmail.trim() }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErro(data.erro || "Erro ao atualizar o e-mail.");
      } else {
        setMensagem("E-mail atualizado com sucesso!");
        setNovoEmail("");
        setConfirmarEmail("");
        setTimeout(() => navigate("/perfil"), 1500);
      }
    } catch (err) {
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="gerenciaremail-main">
      <div className="gerenciaremail-container">

        {/* BOTÃO VOLTAR */}
        <div className="gerenciaremail-voltar" onClick={() => navigate("/perfil")}>
          <span className="material-icons" style={{color: '#3b6ca8', fontSize: '28px'}}>arrow_back</span>
          <span>Voltar</span>
        </div>

        {/* ÍCONE */}
        <div className="gerenciaremail-icone">
          <span className="material-icons">mail</span>
        </div>

        <h2 className="gerenciaremail-title">Gerenciar E-mail</h2>

        {/* INPUT NOVO EMAIL */}
        <div className="gerenciaremail-card">
          <p className="gerenciaremail-label">Novo e-mail</p>
          <input
            className="gerenciaremail-input"
            type="email"
            placeholder="Digite o novo e-mail..."
            value={novoEmail}
            onChange={(e) => setNovoEmail(e.target.value)}
            maxLength={100}
          />
        </div>

        {/* INPUT CONFIRMAR EMAIL */}
        <div className="gerenciaremail-card">
          <p className="gerenciaremail-label">Confirmar novo e-mail</p>
          <input
            className="gerenciaremail-input"
            type="email"
            placeholder="Confirme o novo e-mail..."
            value={confirmarEmail}
            onChange={(e) => setConfirmarEmail(e.target.value)}
            maxLength={100}
            onKeyDown={(e) => e.key === "Enter" && handleSalvar()}
          />
        </div>

        {/* MENSAGENS */}
        {mensagem && <p className="gerenciaremail-sucesso">{mensagem}</p>}
        {erro && <p className="gerenciaremail-erro">{erro}</p>}

        {/* BOTÃO SALVAR */}
        <button
          className="gerenciaremail-btn"
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

export default GerenciarEmail;
