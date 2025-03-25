// src/pages/Lista/Lista.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListaCard from "../../components/Reposicao/ListaCard";
import AdicionarProdutoModal from "../../components/Reposicao/AdicionarProdutoModal";
import Reposicao from "../../components/Reposicao/Reposicao"
import "../Lista/Lista.css";


const Lista = () => {
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos vindos do backend
  const [isCatalogView, setIsCatalogView] = useState(true); // Estado para alternar entre catálogo e lista
  const [selectedProducts, setSelectedProducts] = useState([]); // Estado para armazenar os produtos selecionados
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

  // Função para buscar produtos do backend
  const fetchProdutos = async () => {
    try {
      const response = await axios.get("/api/estoque");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Buscar produtos ao carregar o componente
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Alternar entre visualização de catálogo e lista
  const toggleView = () => {
    setIsCatalogView(!isCatalogView);
  };

  // Alternar a seleção de produtos
  const toggleSelect = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // Calcular o total do carrinho
  const calculateTotal = () => {
    return produtos
      .filter((produto) => selectedProducts.includes(produto.id))
      .reduce((total, produto) => total + produto.quantidade * produto.preco, 0)
      .toFixed(2);
  };

  // Função para adicionar um novo produto (atualiza a lista após adicionar)
  const handleAdicionarProduto = async (novoProduto) => {
    try {
      await axios.post("/api/estoque", novoProduto);
      fetchProdutos(); // Atualiza a lista de produtos após adicionar
      setIsModalOpen(false); // Fecha o modal
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  return (
    <div className="lista-container">
      <h1>Lista de Produtos</h1>
      <div className="controls">
        {/* Botão para alternar entre visualização de catálogo e lista */}
        <button onClick={toggleView}>
          {isCatalogView ? "Ver como Lista" : "Ver como Catálogo"}
        </button>

        {/* Botão para abrir o modal de adicionar produto */}
        <button onClick={() => setIsModalOpen(true)}>Adicionar Produto</button>

        {/* Exibição do total do carrinho */}
        <div className="carrinho-total">
          Carrinho Total: R$ {calculateTotal()}
        </div>
      </div>

      {/* Lista de produtos */}
      <div className="produtos-lista">
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <ListaCard
              key={produto.id}
              produto={produto}
              isCatalogView={isCatalogView}
              isSelected={selectedProducts.includes(produto.id)}
              onToggleSelect={toggleSelect}
            />
          ))
        ) : (
          <p>Nenhum produto disponível.</p>
        )}
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