import React from "react";
import "../Clientes/Clientes.css";

const ClienteCard = ({ cliente, onEditar, onExcluir }) => {
  return (
    <div className="cliente-card">
      <div className="cliente-foto-container">
        {cliente.foto ? (
          <img src={cliente.foto} alt={cliente.nome} className="cliente-foto" />
        ) : (
          <div className="cliente-foto-placeholder">👤</div>
        )}
      </div>
      <div className="cliente-info">
        <h3 className="cliente-nome">{cliente.nome}</h3>
        <p className="cliente-detalhe">Telefone: {cliente.telefone}</p>
        <p className="cliente-detalhe">Endereço: {cliente.endereco}</p>
      </div>
      <div className="cliente-acoes">
        <button onClick={() => onEditar(cliente)}>Editar</button>
        <button onClick={() => onExcluir(cliente.id)}>Excluir</button>
      </div>
    </div>
  );
};

export default ClienteCard;