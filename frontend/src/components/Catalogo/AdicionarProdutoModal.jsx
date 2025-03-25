import React, { useState } from "react";
import "../Catalogo/Catalogo.css";

const AdicionarProdutoModal = ({ isOpen, onClose, onAdicionarProduto }) => {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [local, setLocal] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState(null); // Estado para armazenar a imagem selecionada

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cria o objeto FormData para enviar os dados
    const formData = new FormData();
    formData.append("nome_produto", nome);
    formData.append("quantidade", quantidade);
    formData.append("loja_produto", local);
    formData.append("preco", preco);

    // Adiciona a imagem ao FormData, se houver
    if (imagem) {
      formData.append("imagem", imagem);
    }

    // Envia os dados para o backend
    onAdicionarProduto(formData);

    // Limpa os campos do formulário
    setNome("");
    setQuantidade("");
    setLocal("");
    setPreco("");
    setImagem(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Adicionar Produto</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo para o nome */}
          <div className="form-group">
            <label>Nome do Produto:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          {/* Campo para a quantidade */}
          <div className="form-group">
            <label>Quantidade:</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />
          </div>

          {/* Campo para o local */}
          <div className="form-group">
            <label>Local:</label>
            <input
              type="text"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              required
            />
          </div>

          {/* Campo para o preço */}
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

          {/* Campo para a imagem */}
          <div className="form-group">
            <label>Imagem:</label>
            <input
              type="file"
              accept="image/*" // Aceita apenas arquivos de imagem
              onChange={(e) => setImagem(e.target.files[0])} // Armazena o arquivo selecionado
            />
          </div>

          {/* Botões de Cancelar e Adicionar */}
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