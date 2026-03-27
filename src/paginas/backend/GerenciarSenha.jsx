import "../frontend/GerenciarSenha.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GerenciarSenha() {
  const navigate = useNavigate();

  const usuarioId = localStorage.getItem("usuarioId");

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarAtual, setMostrarAtual] = useState(false);
  const [mostrarNova, setMostrarNova] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSalvar() {
    setMensagem("");
    setErro("");

    if (!senhaAtual.trim() || !novaSenha.trim() || !confirmarSenha.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (novaSenha.trim().length < 6) {
      setErro("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (novaSenha.trim() !== confirmarSenha.trim()) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (novaSenha.trim() === senhaAtual.trim()) {
      setErro("A nova senha deve ser diferente da atual.");
      return;
    }

    if (!usuarioId) {
      setErro("Sessão inválida. Faça login novamente.");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch(
        `http://localhost:3001/usuario/${usuarioId}/senha`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senhaAtual: senhaAtual.trim(),
            novaSenha: novaSenha.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErro(data.erro || "Erro ao atualizar a senha.");
      } else {
        setMensagem("Senha atualizada com sucesso!");
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmarSenha("");
        setTimeout(() => navigate("/perfil"), 1500);
      }
    } catch (err) {
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="gerenciarsenha-main">
      <div className="gerenciarsenha-container">

        {/* BOTÃO VOLTAR */}
        <div className="gerenciarsenha-voltar" onClick={() => navigate("/perfil")}>
          <span className="material-icons" style={{ color: '#3b6ca8', fontSize: '28px' }}>arrow_back</span>
          <span>Voltar</span>
        </div>

        {/* ÍCONE */}
        <div className="gerenciarsenha-icone">
          <span className="material-icons">lock_person</span>
        </div>

        <h2 className="gerenciarsenha-title">Gerenciar Senha</h2>

        {/* SENHA ATUAL */}
        <div className="gerenciarsenha-card">
          <p className="gerenciarsenha-label">Senha atual</p>
          <div className="gerenciarsenha-input-wrapper">
            <input
              className="gerenciarsenha-input"
              type={mostrarAtual ? "text" : "password"}
              placeholder="Digite sua senha atual..."
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              maxLength={100}
            />
            <span
              className="material-icons olho"
              onClick={() => setMostrarAtual(!mostrarAtual)}
              style={{color: 'rgba(255, 255, 255, 0.7)'}}
            >
              {mostrarAtual ? "visibility_off" : "visibility"}
            </span>
          </div>
        </div>

        {/* NOVA SENHA */}
        <div className="gerenciarsenha-card">
          <p className="gerenciarsenha-label">Nova senha</p>
          <div className="gerenciarsenha-input-wrapper">
            <input
              className="gerenciarsenha-input"
              type={mostrarNova ? "text" : "password"}
              placeholder="Digite a nova senha..."
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              maxLength={100}
            />
            <span
              className="material-icons olho"
              onClick={() => setMostrarNova(!mostrarNova)}
              style={{color: 'rgba(255, 255, 255, 0.7)'}}
            >
              {mostrarNova ? "visibility_off" : "visibility"}
            </span>
          </div>
        </div>

        {/* CONFIRMAR NOVA SENHA */}
        <div className="gerenciarsenha-card">
          <p className="gerenciarsenha-label">Confirmar nova senha</p>
          <div className="gerenciarsenha-input-wrapper">
            <input
              className="gerenciarsenha-input"
              type={mostrarConfirmar ? "text" : "password"}
              placeholder="Confirme a nova senha..."
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              maxLength={100}
              onKeyDown={(e) => e.key === "Enter" && handleSalvar()}
            />
            <span
              className="material-icons olho"
              onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
              style={{color: 'rgba(255, 255, 255, 0.7)'}}
            >
              {mostrarConfirmar ? "visibility_off" : "visibility"}
            </span>
          </div>
        </div>

        {/* MENSAGENS */}
        {mensagem && <p className="gerenciarsenha-sucesso">{mensagem}</p>}
        {erro && <p className="gerenciarsenha-erro">{erro}</p>}

        {/* BOTÃO SALVAR */}
        <button
          className="gerenciarsenha-btn"
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
              <span className="material-icons"style={{color: 'white'}}>save</span>
              Salvar Alteração
            </>
          )}
        </button>

      </div>
    </main>
  );
}

export default GerenciarSenha;
