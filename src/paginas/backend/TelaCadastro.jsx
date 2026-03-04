import React, { useState } from "react"; // <- adiciona o useState
import "../frontend/TelaCadastro.css";
import { useNavigate } from "react-router-dom";

function TelaCadastro() {

    const navigate = useNavigate();

    // Guarda o que o usuário digita em cada campo
    const [form, setForm] = useState({
        email: "",
        senha: "",
        confirmarSenha: "",
        nome: ""
    });

    // Guarda a mensagem de erro para mostrar na tela
    const [erro, setErro] = useState("");

    // Controla se a senha está visível ou não
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    // Toda vez que o usuário digita em um input, atualiza o campo certo no form
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Valida se a senha tem os requisitos mínimos
    function validarSenha(senha) {
        if (senha.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
        if (!/[A-Z]/.test(senha)) return "A senha deve ter pelo menos uma letra maiúscula.";
        if (!/[0-9]/.test(senha)) return "A senha deve ter pelo menos um número.";
        return null; // null = senha válida, sem erros
    }

    function handleCadastrar() {
        // Verifica se algum campo está vazio
        if (!form.nome || !form.email || !form.senha || !form.confirmarSenha) {
            setErro("Preencha todos os campos.");
            return;
        }

        // Verifica as regras da senha
        const erroSenha = validarSenha(form.senha);
        if (erroSenha) {
            setErro(erroSenha);
            return;
        }

        // Verifica se senha e confirmar senha são iguais
        if (form.senha !== form.confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        // Se passou por tudo, limpa o erro e vai para Home
        setErro("");
        navigate("/home");
    }

    function irParaTelaLogin() {
        navigate("/Login");
    }

    return (
        <main className="tela-cadastro">
            {/* Fundo */}
            <img 
                src="/images/Fundo-login.png" 
                alt="Fundo"
                className="fundo"
            />

            {/* Conteúdo */}
            <div className="card">
                <h1><b>Mawr EventHub</b></h1>

                <input type="email" name="email" placeholder="E-mail"
                    value={form.email} onChange={handleChange} />

                <input type="text" name="nome" placeholder="Nome Usuario"
                    value={form.nome} onChange={handleChange} />

                {/* Campo senha com botão de olho */}
                <div className="input-senha">
                    <input
                        type={mostrarSenha ? "text" : "password"} // <- troca entre text e password
                        name="senha"
                        placeholder="Senha"
                        value={form.senha}
                        onChange={handleChange}
                    />
                    {/* Clicando no olho, alterna mostrar/esconder */}
                    <span onClick={() => setMostrarSenha(!mostrarSenha)}>
                        {mostrarSenha ? <span className="material-icons search-icon" style={{top: "-5px"}}>visibility_off</span>  :
                                        <span className="material-icons search-icon" style={{top: "-5px"}}>visibility</span>}

                    </span>
                </div>

                {/* Campo confirmar senha com botão de olho */}
                <div className="input-senha">
                    <input
                        type={mostrarConfirmar ? "text" : "password"} // <- troca entre text e password
                        name="confirmarSenha"
                        placeholder="Confirmar Senha"
                        value={form.confirmarSenha}
                        onChange={handleChange}
                    />
                    {/* Clicando no olho, alterna mostrar/esconder */}
                    <span onClick={() => setMostrarConfirmar(!mostrarConfirmar)}>
                        {mostrarConfirmar ? <span className="material-icons search-icon" style={{top: "-5px"}}>visibility_off</span>  :
                                            <span className="material-icons search-icon" style={{top: "-5px"}}>visibility</span>}
                    </span>
                </div>

                {/* Só aparece se tiver algum erro */}
                {erro && <p className="erro">{erro}</p>}

                {/* Botão com navegação */}
                <button onClick={handleCadastrar}>Cadastrar</button>

                {/* Link para login */}
                <a 
                    href="/Login" 
                    className="Login" 
                    onClick={(e) => {
                        e.preventDefault(); 
                        irParaTelaLogin();
                    }}
                >
                    Já tem uma conta ?
                </a>
            
            </div>
        </main>
    );
}

export default TelaCadastro;