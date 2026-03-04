import React from "react";         // Importa o React para usar JSX
import "../frontend/TopBar.css";             // Importa o arquivo de estilos CSS para este componente

// Define o componente funcional TopBar e o exporta
export default function TopBar({ busca, setBusca, filtroLocal, setFiltroLocal }) {
  return (
    // Elemento <header> que representa a barra superior do app
    <header className="top-bar">
      
      {/* Imagem do logo SENAI à esquerda */}
      <img 
        src="/images/logo-senai.png"     // Caminho para a imagem do logo (pasta public)
        className="logo"
        alt="logo do SENAI"          // Classe CSS para estilizar a imagem
      />

      {/* ========== */}

      {/* Container das duas caixas de busca*/}
      <div className="search-container">
      {/*   caixa de busca  */}
      <div className="search-box">
        {/* Input de texto para o usuário digitar a pesquisa */}
        <input 
          type="text" 
          placeholder="Pesquisar por nome" // Texto que aparece quando o campo está vazio
          value={busca} // Valor do input controlado pelo estado 'busca'
          onChange={(e) => setBusca(e.target.value)} // Atualiza o estado 'busca' quando o usuário digita
        />
        {/* Ícone da lupa, usando Material Icons */}
        <span className="material-icons search-icon">search</span>
      </div>


      {/* ========== */}


      <div className="search-box">
        {/* Input de texto para o usuário digitar a pesquisa */}
        <input 
          type="text" 
          placeholder="Pesquisar por local" // Texto que aparece quando o campo está vazio
          value={filtroLocal} // Valor do input controlado pelo estado 'filtroLocal'
          onChange={(e) => setFiltroLocal(e.target.value)} // Atualiza o estado 'filtroLocal' quando o usuário digita
        />
        {/* Ícone da lupa, usando Material Icons */}
        <span className="material-icons search-icon">search</span>
      </div>

      </div>

      {/* ========== */}

      {/* Ícone do sino de notificações à direita */}
      <span className="material-icons bell-icon" title="Você tem que ter uma conta para receber notificações !!">notifications</span>   
    </header>
  );
}
