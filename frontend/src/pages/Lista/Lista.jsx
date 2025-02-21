// src/pages/Lista/Lista.jsx
import React, { useState } from "react";
import ListaCard from "../../components/Lista/ListaCard";
import AdicionarProdutoModal from "../../components/Lista/AdicionarProdutoModal";
import "../Lista/Lista.css";

const Lista = () => {
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: "Escova Almofadada",
      quantidade: 10,
      local: "Prateleira A",
      preco: 99.99,
      foto: "https://embralumi.vteximg.com.br/arquivos/ids/167291-1000-1000/caoa2.jpg?v=637719791035630000",
    },
    {
      id: 2,
      nome: "Escova Oval",
      quantidade: 5,
      local: "Prateleira B",
      preco: 149.99,
      foto: "https://images.tcdn.com.br/img/img_prod/730726/escova_de_cabelo_almofadada_oval_salles_profissional_901_1_ab9206d83c85dd65aaf4450c89a1e2aa.jpeg",
    },
    {
      id: 3,
      nome: "Escova Profissional",
      quantidade: 20,
      local: "Prateleira C",
      preco: 199.99,
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9_Mxjsmp_AzJ2A1dHY3cO6HnjXnlpPDUgYA&s",
    },
  ]);

  const [isCatalogView, setIsCatalogView] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleView = () => {
    setIsCatalogView(!isCatalogView);
  };

  const toggleSelect = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const calculateTotal = () => {
    return produtos
      .filter((produto) => selectedProducts.includes(produto.id))
      .reduce((total, produto) => total + produto.quantidade * produto.preco, 0)
      .toFixed(2);
  };

  const handleAdicionarProduto = (novoProduto) => {
    setProdutos([...produtos, novoProduto]);
  };

  return (
    <div className="lista-container">
      <h1>Lista de Produtos</h1>
      <div className="controls">
        <button onClick={toggleView}>
          {isCatalogView ? "Ver como Lista" : "Ver como Catálogo"}
        </button>
        <button onClick={() => setIsModalOpen(true)}>Adicionar Produto</button>
        <div className="carrinho-total">
          Carrinho Total: R$ {calculateTotal()}
        </div>
      </div>
      <div className="produtos-lista">
        {produtos.map((produto) => (
          <ListaCard
            key={produto.id}
            produto={produto}
            isCatalogView={isCatalogView}
            isSelected={selectedProducts.includes(produto.id)}
            onToggleSelect={toggleSelect}
          />
        ))}
      </div>
      {/* Modal para adicionar produto */}
      <AdicionarProdutoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdicionarProduto={handleAdicionarProduto}
      />
    </div>
  );
};

export default Lista;