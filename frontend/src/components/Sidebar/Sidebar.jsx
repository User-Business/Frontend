import React from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineSell } from "react-icons/md";
import { GrCatalogOption } from "react-icons/gr";
import { CiBoxes } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Osorio&SystemS</h2>
            <ul>
                <li>
                    <Link to="/calendario">
                        <GoHome /> Calendário
                    </Link>
                </li>
                <li>
                    <Link to="/caixa">
                        <MdOutlineSell /> Caixa
                    </Link>
                </li>
                <li>
                    <Link to="/catalogo">
                        <GrCatalogOption /> Catálogo
                    </Link>
                </li>
                <li>
                    <Link to="/lista">
                        <CiBoxes /> Reposição
                    </Link>
                </li>
                <li>
                    <Link to="/clientes">
                        <IoPersonAddOutline /> Clientes
                    </Link>
                </li>
                <li>
                    <Link to="/funcionarios">
                        <AiOutlineTeam /> Funcionários
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;