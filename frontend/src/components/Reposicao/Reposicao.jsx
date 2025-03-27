import React, { useState, useEffect } from "react";
import axios from "axios";
import AdicionarProdutoModal from "./AdicionarProdutoModal";
import ListaCard from "./ListaCard";
import "../Reposicao/Reposicao.css";

const Reposicao = () => {
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos filtrados
  const [selectedProducts, setSelectedProducts] = useState([]); // Estado para armazenar os produtos selecionados
  const [quantidadesSelecionadas, setQuantidadesSelecionadas] = useState({}); // Estado para armazenar as quantidades selecionadas
  const [isListView, setIsListView] = useState(false); // Estado para alternar entre lista e catálogo
  const [modalAberto, setModalAberto] = useState(false); // Estado para controlar o modal

  // Função para buscar produtos do backend
  const fetchProdutos = async () => {
    try {
      const response = await axios.get("/api/estoque");
      const produtosFiltrados = response.data.filter((produto) => produto.quantidade <= 10);
      setProdutos(produtosFiltrados);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Buscar produtos ao carregar o componente
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para alternar a seleção de produtos
  const toggleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // Função para atualizar a quantidade de um produto selecionado
  const updateQuantidade = (id, value) => {
    setQuantidadesSelecionadas({
      ...quantidadesSelecionadas,
      [id]: parseInt(value),
    });
  };

  // Função para processar a compra dos produtos selecionados
  const handleCompra = async () => {
    try {
      const produtosComprados = selectedProducts.map((id) => ({
        id,
        quantidade: quantidadesSelecionadas[id],
      }));

      for (const produto of produtosComprados) {
        const produtoExistente = produtos.find((p) => p.id === produto.id);
        if (produtoExistente) {
          // Atualiza a quantidade do produto existente
          await axios.put(`/api/estoque/${produto.id}`, {
            quantidade: produtoExistente.quantidade + produto.quantidade,
          });
        } else {
          // Cria um novo produto no estoque
          await axios.post("/api/estoque", {
            nome_produto: "Novo Produto",
            quantidade: produto.quantidade,
            loja_produto: "Vista Verde", // Valor padrão
            preco: 0, // Valor padrão
            imagem: null, // Sem imagem
          });
        }
      }

      // Atualiza a lista de produtos após a compra
      fetchProdutos();
      setSelectedProducts([]);
      setQuantidadesSelecionadas({});
    } catch (error) {
      console.error("Erro ao processar compra:", error);
    }
  };

  return (
    <div className="reposicao-container">
      <h1>Reposição de Produtos</h1>

      {/* Botões de Alternância */}
      <div className="view-toggle">
        <button onClick={() => setIsListView(false)}>Catálogo</button>
        <button onClick={() => setIsListView(true)}>Lista</button>
      </div>

      {/* Botão para abrir o modal */}
      <button className="adicionar-produto-btn" onClick={() => setModalAberto(true)}>
        Adicionar Produto
      </button>

      {/* Lista de produtos */}
      <div className="produtos-lista">
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <ListaCard
              key={produto.id}
              produto={produto}
              isCatalogView={!isListView}
              isSelected={selectedProducts.includes(produto.id)}
              onToggleSelect={toggleSelectProduct}
              quantidadeSelecionada={quantidadesSelecionadas[produto.id] || 0}
              onQuantidadeChange={(value) => updateQuantidade(produto.id, value)}
            />
          ))
        ) : (
          <p>Nenhum produto disponível para reposição.</p>
        )}
      </div>

      {/* Botão para processar a compra */}
      <button className="comprar-btn" onClick={handleCompra}>
        Comprar Selecionados
      </button>

      {/* Modal para adicionar produto */}
      <AdicionarProdutoModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onAdicionarProduto={fetchProdutos} // Atualiza a lista após adicionar
      />
    </div>
  );
};

export default Reposicao;