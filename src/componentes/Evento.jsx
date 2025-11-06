// Esta linha define uma função chamada "Evento"
// Ela recebe um parâmetro chamado "props", que contém os dados passados para o componente
function Evento(props) {
    return (
      <div>
        <h3>{props.nome}</h3>{" "}
        {/*Exibe o nome do evento a partir dos dados recebidos do props*/}
        <p>data: {props.data}</p>{" "}
        {/*Mostra a data a apartir dos dados recebidos do props*/}
        <p>Local: {props.local}</p>{" "}
        {/*Mostra a local a partir dos dados recebidos do props*/}
      </div>
    );
  }
  {
    /*precisa dos  "{ }" para o jsx entender que você está usando JavaScript no HTML*/
  }
  export default Evento;
  