// src/components/Calendar/Calendar.jsx
import React, { useState } from "react";
import "../Calendar/Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [clientesMarcados, setClientesMarcados] = useState({});
  const [editandoCliente, setEditandoCliente] = useState(null);
  const [isClienteContainerVisible, setIsClienteContainerVisible] = useState(false); // Novo estado

  // Obtém o ano e o mês atual
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Obtém o primeiro dia do mês e o número de dias no mês
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Lista de nomes dos meses
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Função para trocar de mês
  const changeMonth = (increment) => {
    setCurrentDate(new Date(year, month + increment, 1));
  };

  // Função para formatar a data como YYYY-MM-DD
  const formatDate = (day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  // Função para adicionar/editar cliente
  const handleCliente = (e) => {
    e.preventDefault();
    const nome = e.target.nome.value;
    const horario = e.target.horario.value;
    const cabeleireiro = e.target.cabeleireiro.value;
    const dateKey = formatDate(selectedDay);

    if (!clientesMarcados[dateKey]) {
      clientesMarcados[dateKey] = [];
    }

    if (editandoCliente) {
      // Editar cliente existente
      const index = clientesMarcados[dateKey].findIndex((c) => c.id === editandoCliente.id);
      clientesMarcados[dateKey][index] = { id: editandoCliente.id, nome, horario, cabeleireiro };
    } else {
      // Adicionar novo cliente
      const novoCliente = { id: Date.now(), nome, horario, cabeleireiro };
      clientesMarcados[dateKey].push(novoCliente);
    }

    setClientesMarcados({ ...clientesMarcados });
    setEditandoCliente(null); // Limpa o estado de edição
    e.target.reset(); // Limpa o formulário
  };

  // Função para excluir cliente
  const excluirCliente = (id) => {
    const dateKey = formatDate(selectedDay);
    const clientesAtualizados = clientesMarcados[dateKey].filter((c) => c.id !== id);
    clientesMarcados[dateKey] = clientesAtualizados;
    setClientesMarcados({ ...clientesMarcados });
  };

  // Criar os dias do calendário
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="empty"></div>);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dateKey = formatDate(i);
    const hasClients = clientesMarcados[dateKey]?.length > 0;

    days.push(
      <div
        key={i}
        className={`day ${hasClients ? "marked" : ""}`}
        onClick={() => {
          setSelectedDay(i);
          setIsClienteContainerVisible(true); // Mostra o container ao clicar no dia
        }}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>◀</button>
        <h2>{months[month]} {year}</h2>
        <button onClick={() => changeMonth(1)}>▶</button>
      </div>
      <div className="calendar-grid">
        <div className="day-name">Dom</div>
        <div className="day-name">Seg</div>
        <div className="day-name">Ter</div>
        <div className="day-name">Qua</div>
        <div className="day-name">Qui</div>
        <div className="day-name">Sex</div>
        <div className="day-name">Sáb</div>
        {days}
      </div>

      {/* Container para adicionar/editar clientes */}
      {isClienteContainerVisible && selectedDay && (
        <div className="cliente-container">
          <div className="cliente-container-header">
            <h3>Agendar Cliente para o Dia {selectedDay}</h3>
            <button
              className="close-button"
              onClick={() => setIsClienteContainerVisible(false)} // Fecha o container
            >
              X
            </button>
          </div>
          <form onSubmit={handleCliente}>
            <div className="form-group">
              <label>Nome do Cliente:</label>
              <input
                type="text"
                name="nome"
                defaultValue={editandoCliente?.nome || ""}
                required
              />
            </div>
            <div className="form-group">
              <label>Horário:</label>
              <input
                type="time"
                name="horario"
                defaultValue={editandoCliente?.horario || ""}
                required
              />
            </div>
            <div className="form-group">
              <label>Cabeleireiro:</label>
              <select name="cabeleireiro" defaultValue={editandoCliente?.cabeleireiro || ""} required>
                <option value="">Selecione um cabeleireiro</option>
                <option value="João">João</option>
                <option value="Maria">Maria</option>
                <option value="Carlos">Carlos</option>
              </select>
            </div>
            <button type="submit">{editandoCliente ? "Salvar Alterações" : "Adicionar Cliente"}</button>
          </form>

          {/* Lista de clientes marcados */}
          <ul>
            {clientesMarcados[formatDate(selectedDay)]?.map((cliente) => (
              <li key={cliente.id}>
                <strong>{cliente.nome}</strong> - {cliente.horario} ({cliente.cabeleireiro})
                <div className="acoes">
                  <button onClick={() => setEditandoCliente(cliente)}>Editar</button>
                  <button onClick={() => excluirCliente(cliente.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calendar;