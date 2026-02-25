// importando o arquivo css para estilização
import "../frontend/Modal.css";


// Este é o componente Modal.
// Ele recebe 3 coisas:
// open -> true ou false (define se o modal aparece)
// onClose -> função para fechar o modal
// children -> conteúdo que será exibido dentro do modal
export default function Modal({ open, onClose, children }) {

      // Se "open" for false, o modal NÃO aparece
  // Retorna null = não renderiza nada
  if (!open) return null;

  return (
      // Fundo escuro atrás do modal
    // onClick={onClose} -> se clicar no fundo, fecha o modal
    <div className="overlay" onClick={onClose}>

      {/*
        Esta é a "caixa" do modal.
        onClick={(e) => e.stopPropagation()}
        impede que o clique dentro do modal feche ele.
        (ou seja, só fecha clicando fora)
      */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        
        {/* children é o conteúdo que você envia no App.jsx */}
        {children}

        {/* Botão para fechar o modal */}
        <button className="close-btn" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}