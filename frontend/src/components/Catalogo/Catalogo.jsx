// src/pages/Catalogo/Catalogo.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdicionarProdutoModal from "../../components/Catalogo/AdicionarProdutoModal";
import "../Catalogo/Catalogo.css";

const Catalogo = () => {
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado para erros
  const [modalAberto, setModalAberto] = useState(false); // Estado para controlar o modal

  // Função para buscar produtos do backend
  const fetchProdutos = async () => {
    try {
      const response = await axios.get("/api/estoque");
      const formattedProducts = response.data.map((produto) => ({
        ...produto,
        preco: parseFloat(produto.preco), // Garante que 'preco' seja um número
      }));
      setProdutos(formattedProducts);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setError("Erro ao carregar produtos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Buscar produtos ao carregar o componente
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para adicionar um novo produto
    const handleAdicionarProduto = async (formData) => {
  try {
    await axios.post("/api/estoque", formData, {
      headers: { "Content-Type": "multipart/form-data" }, // Define o tipo de conteúdo como multipart/form-data
    });
    fetchProdutos(); // Atualiza a lista de produtos
    setModalAberto(false); // Fecha o modal
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
  }
};
  // Função para formatar o preço com segurança
  const formatPreco = (preco) => {
    const precoFloat = parseFloat(preco);
    return isNaN(precoFloat) ? "Preço Indisponível" : `R$ ${precoFloat.toFixed(2)}`;
  };

  // Exibir mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) return <p>Carregando produtos...</p>;

  // Exibir mensagem de erro se algo der errado
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="catalogo-container">
      {/* Título da página */}
      <h1>Catálogo de Produtos</h1>

      {/* Botão para abrir o modal de adicionar produto */}
      <button
        className="adicionar-produto-btn"
        onClick={() => setModalAberto(true)}
      >
        Adicionar Produto
      </button>

      {/* Lista de produtos */}
      <div className="produtos-lista">
        {/* Verifica se há produtos disponíveis */}
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <div key={produto.id} className="produto-card">
              {/* Imagem do produto */}
              <img
                src={produto.imagem || "/images/default.jpg"} // Usa uma imagem padrão se não houver imagem
                alt={produto.nome_produto}
                className="produto-foto"
              />
              {/* Nome do produto */}
              <h3>{produto.nome_produto}</h3>
              {/* Quantidade */}
              <p>Quantidade: {produto.quantidade}</p>
              {/* Local */}
              <p>Local: {produto.loja_produto}</p>
              {/* Preço formatado */}
              <p>Preço: {formatPreco(produto.preco)}</p>
            </div>
          ))
        ) : (
          <p>Nenhum produto disponível.</p>
        )}
      </div>

      {/* Modal para adicionar produto */}
      <AdicionarProdutoModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onAdicionarProduto={handleAdicionarProduto}
      />
    </div>
  );
};

export default Catalogo;