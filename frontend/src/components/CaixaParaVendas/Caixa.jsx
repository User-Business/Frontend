import React, { useState } from "react";
import "./Caixa.css";

const mockProducts = [
  { id: 1, name: "Shampoo Profissional", store: "Loja A", quantity: 10, price: 29.99 },
  { id: 2, name: "Condicionador Premium", store: "Loja B", quantity: 5, price: 34.50 },
  { id: 3, name: "Máscara Capilar", store: "Loja A", quantity: 8, price: 45.00 },
  { id: 4, name: "Óleo de Argan", store: "Loja C", quantity: 12, price: 59.90 },
  { id: 5, name: "Spray Fixador", store: "Loja A", quantity: 15, price: 25.99 },
  { id: 6, name: "Creme de Pentear", store: "Loja B", quantity: 7, price: 19.99 },
  { id: 7, name: "Gel Modelador", store: "Loja C", quantity: 9, price: 22.50 },
  { id: 8, name: "Escova Térmica", store: "Loja A", quantity: 3, price: 79.90 }
];

const CaixaParaVendas = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="caixa-vendas-container">
      <h2>Caixa de Vendas</h2>

      {/* Barra de pesquisa */}
      <input
        type="text"
        placeholder="Buscar produto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Área dos produtos com rolagem */}
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
                  <td>{product.name}</td>
                  <td>{product.store}</td>
                  <td>{product.quantity}</td>
                  <td>R$ {product.price.toFixed(2)}</td>
                  <td>
                    <button className="add-button" onClick={() => addToCart(product)}>
                      Adicionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Separação visual */}
      <hr className="separator" />

      {/* Carrinho */}
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
                    <td>{item.name}</td>
                    <td>{item.quantity}x</td>
                    <td>R$ {(item.quantity * item.price).toFixed(2)}</td>
                    <td>
                      <button className="remove-button" onClick={() => removeFromCart(item.id)}>
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

export default CaixaParaVendas;