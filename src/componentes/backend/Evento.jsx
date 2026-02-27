// Esta linha define uma função chamada "Evento"
// Ela recebe um parâmetro chamado "props", que contém os dados passados para o componente
function Evento(props) {

  {/*Retorna um bloco JSX que representa o conteúdo do componente*/}
  return (
    
    <div> {/*Início da div que agrupa os elementos do componente*/}

      

      <h3 style={{fontSize: "23px"}}>{props.nome}</h3>{" "}
      {/*Exibe o nome do evento a partir dos dados recebidos do props*/}

      {/* Data e local na mesma linha, com estilo muted */}
      <p className="muted">
      {props.data} • {props.local}
      </p>
      


    </div>
  );
}
{
  /*precisa dos  "{ }" para o jsx entender que você está usando JavaScript no HTML*/
}

// Exporta o componente "Evento" para que possa ser usado em outros arquivos
export default Evento;