import "./Perfil.css";
import React from "react";
import { useNavigate } from "react-router-dom"; // IMPORTAR

function Perfil() {
  const navigate = useNavigate(); // criar a função de navegação

  function irParaCadastrarEvento() {
    navigate("/CadastrarEvento"); // navega para a rota /CadastrarEvento
  }

  return (
    <main className="perfil-main">
      <div className="perfil-container">

        {/* Avatar */}
        <div className="perfil-avatar">
          <span className="material-icons avatar-icon">account_circle</span>

          <span className="add-photo" style={{color:'#3b6ca8'}}>
            <span className="material-icons add-photo-icon">photo_camera</span>
            <b>Adicionar foto</b>
          </span>
        </div>

        <h2 className="perfil-title" style={{color:'#3b6ca8'}}>Perfil</h2>

        {/* GRID 2x3 */}
        <div className="perfil-grid">

          {/* CARTÃO CADASTRAR EVENTO - ADICIONAR ONCLICK */}
          <div
            className="perfil-card"
            onClick={irParaCadastrarEvento}
          >
            <span className="material-icons card-icon">add_circle</span>
            <p>Cadastrar Evento</p>
          </div>

          {/* Os demais cartões sem alteração */}
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
