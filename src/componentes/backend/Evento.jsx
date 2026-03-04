// Esta linha define uma função chamada "Evento"
// Ela recebe um parâmetro chamado "props", que contém os dados passados para o componente
function Evento(props) {

  // Retorna um bloco JSX que representa o conteúdo do componente
  return (
    <div>
      
      <h3 style={{ fontSize: "23px" }}>{props.nome}</h3>

      {/* Data e local na mesma linha, com estilo muted */}
      <p className="muted">
        {props.data} • {props.local}
      </p>

    </div>
  );
}

// Exporta o componente "Evento" para que possa ser usado em outros arquivos
export default Evento;