import React, { useState } from "react";
import "../Catalogo/Catalogo.css";

const AdicionarProdutoModal = ({ isOpen, onClose, onAdicionarProduto }) => {
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [local, setLocal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoProduto = { nome, foto, quantidade: parseInt(quantidade), local };
    onAdicionarProduto(novoProduto);
    setNome("");
    setFoto("");
    setQuantidade("");
    setLocal("");
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
            <label>URL da Foto:</label>
            <input
              type="text"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
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