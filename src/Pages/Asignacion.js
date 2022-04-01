import React from "react";
import { useState } from "react";
import Graph from "../components/Graph/Graph";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../Styles/asignacion.css";
import Button from "../components/Button/Button";
import AsignacionTable from "../components/AsignacionTable/AsignacionTable";
import asignacionAlgorithm from "../utils/algorithms/asignacion";

const Asignacion = () => {
    const [matrix, setMatrix] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);

    const onClick = (e) => {
        e.preventDefault();
        asignacionAlgorithm(matrix, true);
    }

    return (
        <div className="container">
            <Header title="Algoritmo de Asignación" logo="" />
            <AsignacionTable matrix={matrix} setMatrix={setMatrix} />
            <Footer btnText="Ejecutar Asignacion"  onClick={onClick}/>
        </div>
    );
};

export default Asignacion;
