import React from "react";
import { useState } from "react";
import Graph from "../components/Graph/Graph";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../Styles/asignacion.css";
import Button from "../components/Button/Button";
import AsignacionTable from "../components/AsignacionTable/AsignacionTable";
import { asignacionAlgorithm } from "../utils/algorithms/asignacion";

const Asignacion = () => {
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
        
        const result = asignacionAlgorithm(matrixAsignacion, true);
    }

    const radioButtonChange = (e) => {
        e.preventDefault();
        console.log(e.target);
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
