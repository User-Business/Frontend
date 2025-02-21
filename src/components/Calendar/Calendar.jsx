// src/components/Calendar/Calendar.jsx
import React, { useState, useEffect } from "react";
import "../Calendar/Calendar.css";
import api from "../../services/api";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);
  const [editandoAgendamento, setEditandoAgendamento] = useState(null);
  const [isAgendamentoContainerVisible, setIsAgendamentoContainerVisible] = useState(false);

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
      const response = await api.get('/agenda');
      setAgendamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  // Função para adicionar/editar agendamento
  const handleAgendamento = async (e) => {
    e.preventDefault();
    const data = formatDate(selectedDay);
    const horario = e.target.horario.value;
    const cliente = e.target.cliente.value;
    const cabeleireiro = e.target.cabeleireiro.value;
    const servico = e.target.servico.value; // Campo de serviço
    const observacoes = e.target.observacoes.value; // Campo de observações

    const novoAgendamento = {
      data,
      horario,
      cliente,
      cabeleireiro,
      servico,
      observacoes,
    };

    try {
      if (editandoAgendamento) {
        // Editar agendamento existente
        await api.put(`/agenda/${editandoAgendamento.id}`, novoAgendamento);
      } else {
        // Criar novo agendamento
        await api.post('/agenda', novoAgendamento);
      }

      // Atualiza a lista de agendamentos
      fetchAgendamentos();
      setEditandoAgendamento(null);
      e.target.reset();
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
    }
  };

  // Função para excluir agendamento
  const excluirAgendamento = async (id) => {
    try {
      await api.delete(`/agenda/${id}`);
      fetchAgendamentos(); // Atualiza a lista após exclusão
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
    }
  };

  // Criar os dias do calendário
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="empty"></div>);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dateKey = formatDate(i);
    const hasAgendamentos = agendamentos.some((a) => a.data === dateKey);
    days.push(
      <div
        key={i}
        className={`day ${hasAgendamentos ? "marked" : ""}`}
        onClick={() => {
          setSelectedDay(i);
          setIsAgendamentoContainerVisible(true);
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

      {/* Container para adicionar/editar agendamentos */}
      {isAgendamentoContainerVisible && selectedDay && (
        <div className="cliente-container">
          <div className="cliente-container-header">
            <h3>Agendar Cliente para o Dia {selectedDay}</h3>
            <button
              className="close-button"
              onClick={() => setIsAgendamentoContainerVisible(false)}
            >
              X
            </button>
          </div>
          <form onSubmit={handleAgendamento}>
            <div className="form-group">
              <label>Nome do Cliente:</label>
              <input
                type="text"
                name="cliente"
                defaultValue={editandoAgendamento?.cliente || ""}
                required
              />
            </div>
            <div className="form-group">
              <label>Horário:</label>
              <input
                type="time"
                name="horario"
                defaultValue={editandoAgendamento?.horario || ""}
                required
              />
            </div>
            <div className="form-group">
              <label>Cabeleireiro:</label>
              <select name="cabeleireiro" defaultValue={editandoAgendamento?.cabeleireiro || ""} required>
                <option value="">Selecione um cabeleireiro</option>
                <option value="João">João</option>
                <option value="Maria">Maria</option>
                <option value="Carlos">Carlos</option>
              </select>
            </div>
            <div className="form-group">
              <label>Serviço:</label>
              <input
                type="text"
                name="servico"
                defaultValue={editandoAgendamento?.servico || ""}
                placeholder="Ex: Corte de cabelo"
                required
              />
            </div>
            <div className="form-group">
              <label>Observações:</label>
              <textarea
                name="observacoes"
                defaultValue={editandoAgendamento?.observacoes || ""}
                placeholder="Adicione observações aqui..."
              ></textarea>
            </div>
            <button type="submit">{editandoAgendamento ? "Salvar Alterações" : "Adicionar Agendamento"}</button>
          </form>

          {/* Lista de agendamentos marcados */}
          <ul>
            {agendamentos
              .filter((a) => a.data === formatDate(selectedDay))
              .map((agendamento) => (
                <li key={agendamento.id}>
                  <div className="cliente-info">
                    <span className="foto-bolinha">👤</span> {/* Bolinha como foto */}
                    <strong>{agendamento.cliente}</strong> - {agendamento.horario} ({agendamento.cabeleireiro})
                    <div className="detalhes">
                      <p><strong>Serviço:</strong> {agendamento.servico}</p>
                      <p><strong>Observações:</strong> {agendamento.observacoes}</p>
                    </div>
                  </div>
                  <div className="acoes">
                    <button onClick={() => setEditandoAgendamento(agendamento)}>Editar</button>
                    <button onClick={() => excluirAgendamento(agendamento.id)}>Excluir</button>
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