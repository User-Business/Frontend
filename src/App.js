import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home";
import ListaCard from "./pages/Lista/Lista";
import Clientes from "./pages/Clientes/Clientes";
import Funcionarios from "./pages/Funcionarios/Funcionarios";
import "./components/Sidebar/Sidebar.css"; // Importando o CSS do Sidebar
import "./components/Calendar/Calendar.css";
import CaixaVendas from "./pages/CaixaVendas";
import Catalogo from "./pages/Catalogo/Catalogo"

const App = () => {
  return (
    <Router>
      <div className="container-wrapper">
        <Sidebar />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/calendario" element={<Home />} />
              <Route path="/caixa" element={<CaixaVendas />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/lista" element={<ListaCard />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/funcionarios" element={<Funcionarios />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;