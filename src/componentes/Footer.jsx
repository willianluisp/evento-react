function Footer() {
    // Cria uma data com o momento atual e obtém apenas o ano (ex: 2025)
    const ano = new Date().getFullYear();
    return (
      <div className="containerf">
        <footer>
          <p className="negrito">Willian Luis - Técnico em Desenvolvimento de Sistemas - {ano}</p>
        </footer>
      </div>
    ); //Fecha return
  } //Fecha função
  
  export default Footer;
  