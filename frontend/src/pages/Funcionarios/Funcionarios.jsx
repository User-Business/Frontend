// src/pages/Funcionarios/Funcionarios.jsx
import React, { useState } from "react";
import FuncionarioCard from "../../components/Funcionarios/FuncionarioCard";
import AdicionarEditarFuncionarioModal from "../../components/Funcionarios/AdicionarEditarFuncionarioModal";
import "./Funcionarios.css";

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState([
    {
      id: 1,
      nome: "Carlos Silva",
      telefone: "(11) 98765-4321",
      email: "carlos.silva@empresa.com",
      cargo: "Gerente",
      loja: "Loja Central",
      foto: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      nome: "Ana Souza",
      telefone: "(21) 99887-6543",
      email: "ana.souza@empresa.com",
      cargo: "Vendedora",
      loja: "Loja Norte",
      foto: null,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);

  const handleAdicionarFuncionario = (novoFuncionario) => {
    if (funcionarioEditando) {
      setFuncionarios((prev) =>
        prev.map((f) => (f.id === novoFuncionario.id ? novoFuncionario : f))
      );
    } else {
      setFuncionarios((prev) => [...prev, novoFuncionario]);
    }
    setIsModalOpen(false);
    setFuncionarioEditando(null);
  };

  const handleExcluirFuncionario = (id) => {
    setFuncionarios((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="funcionarios-container">
      <h1>Lista de Funcionários</h1>
      <button onClick={() => setIsModalOpen(true)}>Adicionar Funcionário</button>
      <div className="funcionarios-lista">
        {funcionarios.map((funcionario) => (
          <FuncionarioCard
            key={funcionario.id}
            funcionario={funcionario}
            onEditar={(funcionario) => {
              setFuncionarioEditando(funcionario);
              setIsModalOpen(true);
            }}
            onExcluir={handleExcluirFuncionario}
          />
        ))}
      </div>
      {/* Modal para adicionar/editar funcionário */}
      <AdicionarEditarFuncionarioModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFuncionarioEditando(null);
        }}
        onSave={handleAdicionarFuncionario}
        funcionarioEditando={funcionarioEditando}
      />
    </div>
  );
};

export default Funcionarios;