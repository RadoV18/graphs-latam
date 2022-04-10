import React from "react";
import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../Styles/asignacion.css";
import TransporteTable from "../components/TransporteTable/TransporteTable";
import { northWestAlgorithm } from "../utils/algorithms/northWestAlgorithm";

const Transporte = () => {
    const [selected, setSelected] = useState("");
    const [matrix, setMatrix] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);

    const radioButtonChange = (e) => {
        e.preventDefault();
        setSelected(e.target.id);
    }

    const [demand, setDemand] = useState(["", "", ""]);
    const [available, setAvailable] = useState(["", "", ""]);

    const onClick = (e) => {
        e.preventDefault();

        let matrixTransporte = matrix.slice(1);
        matrixTransporte = matrixTransporte.map((elem) => {
            return elem.slice(1);
        });
        console.log(matrixTransporte);
        let demanda = demand.slice(1);
        demanda = demanda.map((elem) => Number(elem));
        let disponibilidad = available.slice(1);
        disponibilidad = disponibilidad.map((elem) => Number(elem));
        console.log(demanda);
        console.log(disponibilidad);
        const resultado = northWestAlgorithm(matrixTransporte, disponibilidad, demanda, selected === "min" ? false : true);
        const result = [];
        for(let i = 0; i < resultado.length; i++) {
            for(let j = 0; j < resultado[i].length; j++) {
                if(resultado[i][j] !== 0) {
                    result.push([i, j, resultado[i][j]]);
                }
            }
        }
        // primera fila
        let labelsColumn = matrix.slice(0, 1)[0];
        labelsColumn = labelsColumn.slice(1);
        // primera columna
        let labelsRow = matrix.map(elem => elem.filter((val, index) => index === 0));
        labelsRow.slice(1);
        labelsRow = labelsRow.map(elem => elem[0]).slice(1);

        let resultString = "El resultado del algoritmo de transporte es:\n";
        for(let i = 0; i < result.length; i++) {
            resultString += `        ${labelsRow[result[i][0]]} -> ${labelsColumn[result[i][1]]} = ${result[i][2]}\n`;
        }
        alert(resultString);
    };

    return (
        <div className="container">
            <Header title="Algoritmo de Transporte" logo="/img/latam_logo.png" />

            <div className="radio-wrapper">
                <input onChange={radioButtonChange} type="radio" id="max" name="radio" />
                <label htmlFor="max">Maximizar</label>

                <input onChange={radioButtonChange} type="radio" id="min" name="radio" />
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
            <Footer btnText="Ejecutar Transporte" onClick={onClick} dir="/Transporte_MU.pdf" />
        </div>
    );
};

export default Transporte;
