// ============================================================
// eventosService.js
// Responsável por toda a comunicação entre o React e a API
// do backend (Node.js/Express). Contém as funções de listar,
// criar, editar e remover eventos do banco de dados PostgreSQL.
// Basta importar e chamar useEventosService() em qualquer componente.
// ============================================================
import { useState, useEffect, useCallback } from "react";

const API_URL = "http://localhost:3001/eventos";


/**
 * Hook centralizado para gerenciar eventos via API.
 * Substitui o useState([...]) que estava no App.jsx.
 * O nome começa com "use" pois é uma regra obrigatória do React para hooks.
 */
export function useEventosService() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // --- Busca todos os eventos ao montar o componente ---
  const carregarEventos = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Erro ao buscar eventos");
      const data = await res.json();
      setEventos(data);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarEventos();
  }, [carregarEventos]);

  // --- Adiciona um novo evento ---
  async function adicionarEvento(novo) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novo),
      });
      if (!res.ok) throw new Error("Erro ao criar evento");
      const resposta = await res.json();
      const criado = resposta.evento || resposta;
      setEventos((lista) => [criado, ...lista]);
      return criado; // sucesso: retorna o evento criado
    } catch (err) {
      alert("Erro ao salvar evento: " + err.message);
      return null; // falha: retorna null
    }
  }

  // --- Edita um evento existente ---
  async function editarEvento(eventoEditado) {
    try {
      const res = await fetch(`${API_URL}/${eventoEditado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventoEditado),
      });
      if (!res.ok) throw new Error("Erro ao editar evento");
      const atualizado = await res.json();
      setEventos((lista) =>
        lista.map((e) => (e.id === atualizado.id ? atualizado : e))
      );
      return atualizado;
    } catch (err) {
      alert("Erro ao editar evento: " + err.message);
    }
  }

  // --- Remove um evento pelo ID ---
  async function removerEvento(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao remover evento");
      setEventos((lista) => lista.filter((e) => e.id !== id));
    } catch (err) {
      alert("Erro ao remover evento: " + err.message);
    }
  }

  // --- Remove todos os eventos ---
  async function removerTodos() {
    if (!window.confirm("Tem certeza que deseja remover todos os eventos?")) return;
    try {
      const res = await fetch(API_URL, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao remover todos os eventos");
      setEventos([]);
    } catch (err) {
      alert("Erro ao remover todos os eventos: " + err.message);
    }
  }

  return {
    eventos,
    carregando,
    erro,
    adicionarEvento,
    editarEvento,
    removerEvento,
    removerTodos,
  };
}
