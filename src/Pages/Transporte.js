import React from "react";
import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../Styles/asignacion.css";
import TransporteTable from "../components/TransporteTable/TransporteTable";
import { northWestAlgorithm } from "../utils/algorithms/northWestAlgorithm";

const Transporte = () => {
    const [matrix, setMatrix] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);

    const [demand, setDemand] = useState(["", "", ""]);
    const [available, setAvailable] = useState(["", "", ""]);

    const onClick = (e) => {
        e.preventDefault();
        northWestAlgorithm(matrix, true);
    };

    return (
        <div className="container">
            <Header title="Algoritmo de Asignación" logo="" />

            <div className="radio-wrapper">
                <input type="radio" id="max" name="radio" />
                <label htmlFor="max">Maximizar</label>

                <input type="radio" id="min" name="radio" />
                <label htmlFor="min">Minimizar</label>
            </div>

            <TransporteTable
                matrix={matrix}
                setMatrix={setMatrix}
                available={available}
                setAvailable={setAvailable}
                demand={demand}
                setDemand={setDemand}
            />
            <Footer btnText="Ejecutar Asignacion" onClick={onClick} />
        </div>
    );
};

export default Transporte;
