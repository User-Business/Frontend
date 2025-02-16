import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  // Criar os dias do calendário
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="empty"></div>);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(<div key={i} className="day">{i}</div>);
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
    </div>
  );
};

export default Calendar;
