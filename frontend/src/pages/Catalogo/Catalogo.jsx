import React, { useState } from "react";
import ProdutoCard from "../../components/Catalogo/ProdutoCard";
import AdicionarProdutoModal from "../../components/Catalogo/AdicionarProdutoModal";
import "../Catalogo/Catalogo.css";

const Catalogo = () => {
  // Estado para a lista de produtos
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: "Produto 1",
      foto: "https://images-americanas.b2w.io/produtos/4137223563/imagens/escova-cabelo-profissional-20mm-ceramica-cerdas-mistas/4137223563_1_large.jpg",
      quantidade: 10,
      local: "Prateleira A",
      preco: 99.99, // Adicionando o preço
    },
    {
      id: 2,
      nome: "Produto 2",
      foto: "https://drogariasp.vteximg.com.br/arquivos/ids/543955-1000-1000/695190---escova-de-cabelo-ricca-oval-almofadada-1-unidade.jpg?v=637804426561800000",
      quantidade: 5,
      local: "Prateleira B",
      preco: 149.99, // Adicionando o preço
    },
    {
      id: 3,
      nome: "Produto 3",
      foto: "https://cdn.awsli.com.br/2500x2500/2076/2076647/produto/144132589/2dcd334b21.jpg",
      quantidade: 20,
      local: "Prateleira C",
      preco: 199.99, // Adicionando o preço
    },
  ]);

  // Estado para controlar a abertura do modal
  const [modalAberto, setModalAberto] = useState(false);

  // Função para adicionar um novo produto
  const adicionarProduto = (novoProduto) => {
    setProdutos([...produtos, { ...novoProduto, id: produtos.length + 1 }]);
    setModalAberto(false); // Fecha o modal após adicionar
  };

  return (
    <div className="catalogo-container">
      <h1>Catálogo de Produtos</h1>
      <button className="adicionar-produto-btn" onClick={() => setModalAberto(true)}>
        Adicionar Produto
      </button>

      <div className="produtos-lista">
        {produtos.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </div>

      {/* Modal para adicionar produto */}
      <AdicionarProdutoModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onAdicionarProduto={adicionarProduto}
      />
    </div>
  );
};

export default Catalogo;