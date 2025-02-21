// src/components/Lista/AdicionarProdutoModal.jsx
import React, { useState } from "react";
import "../Lista/Lista.css";

const AdicionarProdutoModal = ({ isOpen, onClose, onAdicionarProduto }) => {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [local, setLocal] = useState("");
  const [preco, setPreco] = useState("");
  const [foto, setFoto] = useState("");
  const [semFoto, setSemFoto] = useState(false); // Estado para indicar se o usuário não quer adicionar foto

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoProduto = {
      id: Date.now(), // Gera um ID único baseado no timestamp
      nome,
      quantidade: parseInt(quantidade),
      local,
      preco: parseFloat(preco),
      foto: semFoto ? null : foto, // Se 'semFoto' for true, define 'foto' como null
    };
    onAdicionarProduto(novoProduto);
    setNome("");
    setQuantidade("");
    setLocal("");
    setPreco("");
    setFoto("");
    setSemFoto(false); // Reseta o estado do checkbox
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Adicionar Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Produto:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Quantidade:</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Local:</label>
            <input
              type="text"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Preço:</label>
            <input
              type="number"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>URL da Foto (opcional):</label>
            <input
              type="text"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              disabled={semFoto} // Desativa o campo se 'semFoto' for true
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={semFoto}
                onChange={(e) => setSemFoto(e.target.checked)}
              />
              Não adicionar foto
            </label>
          </div>
          <div className="modal-botoes">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdicionarProdutoModal;