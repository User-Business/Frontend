import React, { useState } from "react";
import ClienteCard from "../../components/Clientes/ClientesCard";
import AdicionarEditarClienteModal from "../../components/Clientes/AdicionarEditarClienteModal";
import "../Clientes/Clientes.css";

const Clientes = () => {
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nome: "João Silva",
      telefone: "(11) 98765-4321",
      endereco: "Rua das Flores, 123 - São Paulo",
      foto: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      nome: "Maria Souza",
      telefone: "(21) 99887-6543",
      endereco: "Avenida Brasil, 456 - Rio de Janeiro",
      foto: null,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // Inicializa como false
  const [clienteEditando, setClienteEditando] = useState(null);

  const handleAdicionarCliente = (novoCliente) => {
    if (clienteEditando) {
      // Se estiver editando, atualiza o cliente existente
      setClientes((prev) =>
        prev.map((c) => (c.id === novoCliente.id ? novoCliente : c))
      );
    } else {
      // Se estiver adicionando, cria um novo cliente
      setClientes((prev) => [...prev, novoCliente]);
    }
    setIsModalOpen(false); // Fecha o modal após salvar
    setClienteEditando(null); // Reseta o estado de edição
  };

  const handleExcluirCliente = (id) => {
    setClientes((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="clientes-container">
      <h1>Lista de Clientes</h1>
      <button onClick={() => setIsModalOpen(true)}>Adicionar Cliente</button>
      <div className="clientes-lista">
        {clientes.map((cliente) => (
          <ClienteCard
            key={cliente.id}
            cliente={cliente}
            onEditar={(cliente) => {
              setClienteEditando(cliente);
              setIsModalOpen(true);
            }}
            onExcluir={handleExcluirCliente}
          />
        ))}
      </div>
      {/* Modal para adicionar/editar cliente */}
      <AdicionarEditarClienteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setClienteEditando(null);
        }}
        onSave={handleAdicionarCliente}
        clienteEditando={clienteEditando}
      />
    </div>
  );
};

export default Clientes;