// src/components/Lista/ListaCard.jsx
import React from "react";
import "../Lista/Lista.css";

const ListaCard = ({ produto, isCatalogView, isSelected, onToggleSelect }) => {
  return (
    <div className={`lista-card ${isCatalogView ? "catalog-view" : "list-view"}`}>
      {isCatalogView && produto.image && (
        <img src={produto.image} alt={produto.nome_produto} className="produto-foto" />
      )}
      <div className="card-content">
        <h3 className="produto-nome">{produto.nome_produto}</h3>
        <p className="produto-info">Quantidade: {produto.quantidade}</p>
        <p className="produto-info">Local: {produto.loja_produto}</p>
        <div className="produto-preco">R$ {produto.preco.toFixed(2)}</div>
      </div>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(produto.id)}
        className="select-checkbox"
      />
    </div>
  );
};

export default ListaCard;