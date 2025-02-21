// src/components/Clientes/AdicionarEditarClienteModal.jsx
import React, { useState } from "react";
import "../Clientes/Clientes.css";

const AdicionarEditarClienteModal = ({ isOpen, onClose, onSave, clienteEditando }) => {
  const [nome, setNome] = useState(clienteEditando?.nome || "");
  const [telefone, setTelefone] = useState(clienteEditando?.telefone || "");
  const [endereco, setEndereco] = useState(clienteEditando?.endereco || "");
  const [foto, setFoto] = useState(clienteEditando?.foto || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoCliente = {
      id: clienteEditando?.id || Date.now(), // Gera um ID único se for um novo cliente
      nome,
      telefone,
      endereco,
      foto: foto || null, // Define como null se não houver foto
    };
    onSave(novoCliente);
  };

  if (!isOpen) return null; // Não renderiza o modal se isOpen for false

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{clienteEditando ? "Editar Cliente" : "Adicionar Cliente"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Telefone:</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Endereço:</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Foto (URL, opcional):</label>
            <input
              type="text"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
            />
          </div>
          <div className="modal-botoes">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">{clienteEditando ? "Salvar" : "Adicionar"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdicionarEditarClienteModal;