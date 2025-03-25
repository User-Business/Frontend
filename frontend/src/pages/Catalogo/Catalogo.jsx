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
      setProdutos(response.data);
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
  const handleAdicionarProduto = async (novoProduto) => {
    try {
      await axios.post("/api/estoque", novoProduto);
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

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="catalogo-container">
      <h1>Catálogo de Produtos</h1>

      {/* Botão para abrir o modal */}
      <button
        className="adicionar-produto-btn"
        onClick={() => setModalAberto(true)}
      >
        Adicionar Produto
      </button>

      {/* Lista de produtos */}
      <div className="produtos-lista">
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <div key={produto.id} className="produto-card">
              {/* Imagem do produto */}
              {produto.image ? (
                <img
                  src={produto.image} // URL base64 da imagem
                  alt={produto.nome_produto}
                  className="produto-foto"
                />
              ) : (
                <p>Sem imagem disponível</p>
              )}
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