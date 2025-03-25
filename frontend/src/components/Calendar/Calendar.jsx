// src/components/Calendar/Calendar.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Calendar/Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [clientesMarcados, setClientesMarcados] = useState({});
  const [editandoCliente, setEditandoCliente] = useState(null);
  const [isClienteContainerVisible, setIsClienteContainerVisible] = useState(false);

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

  // Função para buscar agendamentos do backend
  const fetchAgendamentos = async () => {
    try {
      const response = await axios.get("/api/agenda");
      const agendamentos = response.data;
      const marcados = {};
      agendamentos.forEach((agendamento) => {
        const dateKey = agendamento.data;
        if (!marcados[dateKey]) {
          marcados[dateKey] = [];
        }
        marcados[dateKey].push({
          id: agendamento.id,
          nome: agendamento.cliente,
          horario: agendamento.horario,
          cabeleireiro: agendamento.cabeleireiro,
          servico: agendamento.servico,
          observacoes: agendamento.observacoes,
        });
      });
      setClientesMarcados(marcados);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  // Efeito para buscar agendamentos ao carregar o componente ou mudar de mês
  useEffect(() => {
    fetchAgendamentos();
  }, [currentDate]);

  // Função para adicionar/editar cliente
  const handleCliente = async (e) => {
    e.preventDefault();
    const nome = e.target.nome.value;
    const horario = e.target.horario.value;
    const cabeleireiro = e.target.cabeleireiro.value;
    const servico = e.target.servico.value; // Novo campo
    const observacoes = e.target.observacoes.value; // Novo campo
    const dateKey = formatDate(selectedDay);

    try {
      const agendamento = {
        data: dateKey,
        horario,
        cliente: nome,
        cabeleireiro,
        servico,
        observacoes,
        status: "agendado",
      };

      if (editandoCliente) {
        // Atualizar cliente existente
        await axios.put(`/api/agenda/${editandoCliente.id}`, agendamento);
      } else {
        // Criar novo cliente
        await axios.post("/api/agenda", agendamento);
      }

      // Atualizar lista de agendamentos
      fetchAgendamentos();
      setEditandoCliente(null);
      e.target.reset();
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
    }
  };

  // Função para excluir cliente
  const excluirCliente = async (id) => {
    try {
      await axios.delete(`/api/agenda/${id}`);
      fetchAgendamentos();
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
    }
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
          setIsClienteContainerVisible(true);
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
              onClick={() => setIsClienteContainerVisible(false)}
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
            {/* Novo campo: Serviço */}
            <div className="form-group">
              <label>Serviço:</label>
              <select name="servico" defaultValue={editandoCliente?.servico || ""} required>
                <option value="">Selecione um serviço</option>
                <option value="Corte de Cabelo">Corte de Cabelo</option>
                <option value="Manicure">Manicure</option>
                <option value="Pedicure">Pedicure</option>
                <option value="Maquiagem">Maquiagem</option>
              </select>
            </div>
            {/* Novo campo: Observações */}
            <div className="form-group">
              <label>Observações:</label>
              <textarea
                name="observacoes"
                defaultValue={editandoCliente?.observacoes || ""}
                rows="3"
              ></textarea>
            </div>
            <button type="submit">{editandoCliente ? "Salvar Alterações" : "Adicionar Cliente"}</button>
          </form>

          {/* Lista de clientes marcados */}
          <ul>
            {clientesMarcados[formatDate(selectedDay)]?.map((cliente) => (
              <li key={cliente.id}>
                <strong>{cliente.nome}</strong> - {cliente.horario} ({cliente.cabeleireiro})
                <div>
                  <span>Serviço: {cliente.servico}</span>
                  <br />
                  <span>Obs: {cliente.observacoes || "Nenhuma observação"}</span>
                </div>
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