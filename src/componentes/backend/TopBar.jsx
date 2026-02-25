import React from "react";         // Importa o React para usar JSX
import "../frontend/TopBar.css";             // Importa o arquivo de estilos CSS para este componente

// Define o componente funcional TopBar e o exporta
export default function TopBar() {
  return (
    // Elemento <header> que representa a barra superior do app
    <header className="top-bar">
      
      {/* Imagem do logo SENAI à esquerda */}
      <img 
        src="/images/logo-senai.png"     // Caminho para a imagem do logo (pasta public)
        className="logo"          // Classe CSS para estilizar a imagem
      />

      {/* Container da caixa de busca central */}
      <div className="search-box">
        {/* Input de texto para o usuário digitar a pesquisa */}
        <input 
          type="text" 
          placeholder="Pesquisar..." // Texto que aparece quando o campo está vazio
        />
        {/* Ícone da lupa, usando Material Icons */}
        <span className="material-icons search-icon">search</span>
      </div>

      {/* Ícone do sino de notificações à direita */}
      <span className="material-icons bell-icon">notifications</span>
    </header>
  );
}
