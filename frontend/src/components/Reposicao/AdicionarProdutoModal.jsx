import React, { useState } from "react";
import axios from "axios";
import "../Reposicao/Reposicao.css";

const AdicionarProdutoModal = ({ isOpen, onClose, onAdicionarProduto }) => {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [local, setLocal] = useState("Vista Verde"); // Valor padrão
  const [preco, setPreco] = useState("");
  const [foto, setFoto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoProduto = {
      nome_produto: nome,
      quantidade: parseInt(quantidade),
      loja_produto: local,
      preco: parseFloat(preco),
      image: foto || null, // Permite que a imagem seja opcional
    };

    try {
      await axios.post("/api/estoque", novoProduto);
      onAdicionarProduto(); // Atualiza a lista de produtos
      onClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Adicionar Produto</h2>
        <form onSubmit={handleSubmit}>
          {/* Campos do formulário */}
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
            <select value={local} onChange={(e) => setLocal(e.target.value)}>
              <option value="Vista Verde">Vista Verde</option>
              <option value="Satélite">Satélite</option>
            </select>
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