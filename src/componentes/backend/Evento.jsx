// Esta linha define uma função chamada "Evento"
// Ela recebe um parâmetro chamado "props", que contém os dados passados para o componente
function Evento(props) {

    {/*Retorna um bloco JSX que representa o conteúdo do componente*/}
  return ( 
      <div> {/*Início da div que agrupa os elementos do componente*/}

        <h3>{props.nome}</h3>{" "}
        {/*Exibe o nome do evento a partir dos dados recebidos do props*/}

        <p>data: {props.data}</p>{" "}
        {/*Mostra a data a apartir dos dados recebidos do props*/}

        <p>Local: {props.local}</p>{" "}
        {/*Mostra a local a partir dos dados recebidos do props*/}

        <p>Descrição: {props.descricao}</p>{" "}
        {/*Mostra a descrição a partir dos dados recebidos do props*/}
      
      </div>
    );
  }
  {
    /*precisa dos  "{ }" para o jsx entender que você está usando JavaScript no HTML*/
  }
  
  // Exporta o componente "Evento" para que possa ser usado em outros arquivos
  export default Evento;
  