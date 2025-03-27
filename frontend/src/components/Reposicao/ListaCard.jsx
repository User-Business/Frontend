// src/components/Reposicao/ListaCard.jsx
import React from "react";
import "../Reposicao/Reposicao.css";

const ListaCard = ({
  produto,
  isCatalogView,
  isSelected,
  onToggleSelect,
  quantidadeSelecionada,
  onQuantidadeChange,
}) => {
  return (
    <div className={`lista-card ${isCatalogView ? "catalog-view" : "list-view"}`}>
      {/* Exibe a imagem apenas no modo catálogo */}
      {isCatalogView && produto.imagem && (
        <img src={produto.imagem || "/images/default.jpg"} alt={produto.nome_produto} className="produto-foto" />
      )}

      <div className="card-content">
        <h3 className="produto-nome">{produto.nome_produto}</h3>
        <p className="produto-info">Quantidade: {produto.quantidade}</p>
        <p className="produto-info">Local: {produto.loja_produto}</p>
        <div className="produto-preco">R$ {produto.preco.toFixed(2)}</div>

        {/* Opções de seleção e quantidade */}
        <div className="select-options">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(produto.id)}
            className="select-checkbox"
          />
          <input
            type="number"
            value={quantidadeSelecionada}
            onChange={(e) => onQuantidadeChange(e.target.value)}
            placeholder="Quantidade"
            min="1"
            className="quantidade-input"
          />
        </div>
      </div>
    </div>
  );
};

export default ListaCard;