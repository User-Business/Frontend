import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Caixa.css";

const Caixa = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [produtos, setProdutos] = useState([]);

  // Função para buscar produtos do backend
  const fetchProdutos = async () => {
    try {
      const response = await axios.get("/api/estoque");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const filteredProducts = produtos.filter((product) =>
    product.nome_produto.toLowerCase().includes(search.toLowerCase())
  );

  // Função para formatar o preço corretamente
  const formatPreco = (preco) => {
    const precoFloat = parseFloat(preco); // Converte para número, se possível
    return isNaN(precoFloat) ? "0.00" : precoFloat.toFixed(2);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantidade: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Cálculo do total com segurança para evitar erros de tipo
  const totalAmount = cart.reduce(
    (sum, item) => sum + (parseFloat(item.preco) || 0) * item.quantidade,
    0
  );

  return (
    <div className="caixa-vendas-container">
      <h2>Caixa de Vendas</h2>

      <input
        type="text"
        placeholder="Buscar produto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="product-section">
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Loja</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Adicionar</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.nome_produto}</td>
                  <td>{product.loja_produto}</td>
                  <td>{product.quantidade}</td>
                  <td>R$ {formatPreco(product.preco)}</td>
                  <td>
                    <button
                      className="add-button"
                      onClick={() => addToCart(product)}
                    >
                      Adicionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <hr className="separator" />

      <div className="cart">
        <h2>Carrinho</h2>
        {cart.length === 0 ? (
          <p>Carrinho vazio</p>
        ) : (
          <div className="cart-content">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Qtd</th>
                  <th>Subtotal</th>
                  <th>Remover</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome_produto}</td>
                    <td>{item.quantidade}x</td>
                    <td>R$ {(item.quantidade * (parseFloat(item.preco) || 0)).toFixed(2)}</td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <h3>Total: R$ {totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Caixa;
