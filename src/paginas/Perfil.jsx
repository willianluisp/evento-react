import "./Perfil.css";

function Perfil() {
  return (
    <main className="perfil-main">

      <div className="perfil-container">

        {/* Avatar */}
        <div className="perfil-avatar">
          <span className="material-icons avatar-icon" style={{ fontSize: '180px', color:'#3b6ca8' }}>account_circle</span>
          <span className="add-photo" style={{fontSize: '16px', color:'#3b6ca8'}}>
            <span className="material-icons" style={{fontSize: '22px', color:'#3b6ca8'}}>photo_camera</span> Adicionar foto
          </span>
        </div>

        <h2 className="perfil-title" style={{ fontSize:'50px', color:'#3b6ca8'}}>Perfil</h2>:

        {/* GRID 2x3 */}
        <div className="perfil-grid">

          <div className="perfil-card">
            <span className="material-icons card-icon" style={{ fontSize: '22px', color: 'white'}}>add_circle</span>
            <p>Cadastrar Evento</p>
          </div>

          <div className="perfil-card">
            <span className="material-icons card-icon" style={{ fontSize: '22px', color:'white'}}>lock_person</span>
            <p>Gerenciar Senha</p>
          </div>

          <div className="perfil-card">
            <span className="material-icons card-icon" style={{ fontSize:'22px', color:'white'}}>mail</span>
            <p>Gerenciar E-mail</p>
          </div>

          <div className="perfil-card">
            <span className="material-icons card-icon" style={{ fontSize:'22px', color: 'white'}}>bookmark</span>
            <p>Eventos Salvos</p>
          </div>

          <div className="perfil-card">
            <span className="material-icons card-icon" style={{ fontSize: '22px', color:'white'}}>thumb_up</span>
            <p>Feedback</p>
          </div>

          <div className="perfil-card">
            <span className="material-icons card-icon" style={{ fontSize:'22px', color: 'white'}}>badge</span>
            <p>Mudar nome de usuário</p>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Perfil;
