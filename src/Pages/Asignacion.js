import React from "react";
import { useState, useEffect } from "react";
import Graph from "../components/Graph/Graph";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../Styles/asignacion.css";
import Button from "../components/Button/Button";
import AsignacionTable from "../components/AsignacionTable/AsignacionTable";
import { asignacionAlgorithm } from "../utils/algorithms/asignacion";

const Asignacion = () => {
    const [selected, setSelected] = useState("");
    const [matrix, setMatrix] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);

    const onClick = (e) => {
        e.preventDefault();
        let matrixAsignacion = matrix.slice(1);
        matrixAsignacion = matrixAsignacion.map((elem) => {
            return elem.slice(1);
        })
        
        const result = asignacionAlgorithm(matrixAsignacion, selected === "min" ? false : true)[0];
        // primera fila
        let labelsColumn = matrix.slice(0, 1)[0];
        labelsColumn = labelsColumn.slice(1);
        // primera columna
        let labelsRow = matrix.map(elem => elem.filter((val, index) => index === 0));
        labelsRow.slice(1);
        labelsRow = labelsRow.map(elem => elem[0]).slice(1);

        let resultString = "El resultado del algoritmo de asignacion es:\n";
        for(let i = 0; i < result.length; i++) {
            resultString += `        ${labelsRow[result[i][0]]} -> ${labelsColumn[result[i][1]]}\n`;
        }
        alert(resultString);
    }

    const radioButtonChange = (e) => {
        e.preventDefault();
        setSelected(e.target.id);
    }

    return (
        <div className="container">
            <Header title="Algoritmo de Asignación" logo="" />

            <div className="radio-wrapper">
              <input onChange={radioButtonChange} type="radio" id="max" name="radio" />
              <label htmlFor="max">Maximizar</label>

              <input onChange={radioButtonChange} type="radio" id="min" name="radio" />
              <label htmlFor="min">Minimizar</label>
            </div>


            <AsignacionTable matrix={matrix} setMatrix={setMatrix} />
            <Footer btnText="Ejecutar Asignacion"  onClick={onClick}/>
        </div>
    );
};

export default Asignacion;
