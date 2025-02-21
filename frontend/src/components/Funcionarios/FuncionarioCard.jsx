// src/components/Funcionarios/FuncionarioCard.jsx
import React from "react";
import "../Funcionarios/Funcionarios.css";

const FuncionarioCard = ({ funcionario, onEditar, onExcluir }) => {
  return (
    <div className="funcionario-card">
      <div className="funcionario-foto-container">
        {funcionario.foto ? (
          <img src={funcionario.foto} alt={funcionario.nome} className="funcionario-foto" />
        ) : (
          <div className="funcionario-foto-placeholder">👤</div>
        )}
      </div>
      <div className="funcionario-info">
        <h3 className="funcionario-nome">{funcionario.nome}</h3>
        <p className="funcionario-detalhe">Telefone: {funcionario.telefone}</p>
        <p className="funcionario-detalhe">Email: {funcionario.email}</p>
        <p className="funcionario-detalhe">Cargo: {funcionario.cargo}</p>
        <p className="funcionario-detalhe">Loja: {funcionario.loja}</p>
      </div>
      <div className="funcionario-acoes">
        <button onClick={() => onEditar(funcionario)}>Editar</button>
        <button onClick={() => onExcluir(funcionario.id)}>Excluir</button>
      </div>
    </div>
  );
};

export default FuncionarioCard;