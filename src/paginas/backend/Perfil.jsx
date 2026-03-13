import "../frontend/Perfil.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function Perfil() {

  const navigate = useNavigate();

  // Aqui pegamos o nome do usuário que foi salvo no login
  const usuario = localStorage.getItem("usuario");

  // função para ir para tela de cadastrar evento
  function irParaCadastrarEvento() {
    navigate("/CadastrarEvento");
  }

  // função para sair da conta
  function irParaTelaCadastro() {

    // removendo usuário salvo
    localStorage.removeItem("usuario");

    // voltando para tela inicial
    navigate("/");
  }

  return (
    <main className="perfil-main">
      <div className="perfil-container">

        {/* BOTÃO SAIR DA CONTA */}
        <div className="sairConta" onClick={irParaTelaCadastro}>

        <span className="material-icons add-exit_to_app">
        <b>exit_to_app</b>
        </span>

        <p className="Sair-Conta" style={{ fontSize: '15px', marginTop: '0px'}}>
          <b>Sair da Conta</b>
        </p>

        </div>

        {/* AVATAR DO USUÁRIO */}
        <div className="perfil-avatar">

          <span className="material-icons avatar-icon">
            account_circle
          </span>

          <span className="add-photo" style={{color:'#3b6ca8'}}>

            <span className="material-icons add-photo-icon">
              photo_camera
            </span>

            <b>Adicionar foto</b>

          </span>

        </div>

        {/* AQUI MOSTRAMOS O NOME DO USUÁRIO */}
        <h2 className="perfil-title" style={{color:'#3b6ca8'}}>

          {/* Se tiver usuário mostra o nome, senão mostra Perfil */}
          {usuario ? `Olá, ${usuario}` : "Perfil"}

        </h2>


        {/* GRID COM OS BOTÕES */}
        <div className="perfil-grid">

          <div
            className="perfil-card"
            onClick={irParaCadastrarEvento}
          >
            <span className="material-icons card-icon">add_circle</span>
            <p>Cadastrar Evento</p>
          </div>

          <div className="perfil-card">
            <span className="material-icons card-icon">lock_person</span>
            <p>Gerenciar Senha</p>
          </div>

          <div className="perfil-card">
            <span className="material-icons card-icon">mail</span>
            <p>Gerenciar E-mail</p>
          </div>

          <div className="perfil-card">
            <span className="material-icons card-icon">bookmark</span>
            <p>Eventos Salvos</p>
          </div>

          <div className="perfil-card">
            <span className="material-icons card-icon">thumb_up</span>
            <p>Feedback</p>
          </div>

          <div className="perfil-card">
            <span className="material-icons card-icon">badge</span>
            <p>Mudar nome de usuário</p>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Perfil;
