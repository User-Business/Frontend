import React from "react";
import "../Catalogo/Catalogo.css";

const ProdutoCard = ({ produto }) => {
  return (
    <div className="produto-card">
      <img src={produto.foto} alt={produto.nome} className="produto-foto" />
      <h3 className="produto-nome">{produto.nome}</h3>
      <p className="produto-info">Quantidade: {produto.quantidade}</p>
      <p className="produto-info">Local: {produto.local}</p>
      <div className="produto-preco">R$ {produto.preco}</div>
    </div>
  );
};

export default ProdutoCard;