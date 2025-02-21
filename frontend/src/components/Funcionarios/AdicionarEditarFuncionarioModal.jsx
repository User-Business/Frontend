// src/components/Funcionarios/AdicionarEditarFuncionarioModal.jsx
import React, { useState } from "react";
import "../Funcionarios/Funcionarios.css";

const AdicionarEditarFuncionarioModal = ({ isOpen, onClose, onSave, funcionarioEditando }) => {
  const [nome, setNome] = useState(funcionarioEditando?.nome || "");
  const [telefone, setTelefone] = useState(funcionarioEditando?.telefone || "");
  const [email, setEmail] = useState(funcionarioEditando?.email || "");
  const [cargo, setCargo] = useState(funcionarioEditando?.cargo || "");
  const [loja, setLoja] = useState(funcionarioEditando?.loja || "");
  const [foto, setFoto] = useState(funcionarioEditando?.foto || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoFuncionario = {
      id: funcionarioEditando?.id || Date.now(), // Gera um ID único se for um novo funcionário
      nome,
      telefone,
      email,
      cargo,
      loja,
      foto: foto || null, // Define como null se não houver foto
    };
    onSave(novoFuncionario);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{funcionarioEditando ? "Editar Funcionário" : "Adicionar Funcionário"}</h2>
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
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Cargo:</label>
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Loja:</label>
            <input
              type="text"
              value={loja}
              onChange={(e) => setLoja(e.target.value)}
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
            <button type="submit">{funcionarioEditando ? "Salvar" : "Adicionar"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdicionarEditarFuncionarioModal;