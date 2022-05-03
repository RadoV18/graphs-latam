import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import AnimationContainer from "../components/AnimationContainer/AnimationContainer";
import {
    arregloRandomico,
    convertirArregloNumeros,
    execTimeShellSort,
} from "../utils/algorithms/sortTime";

const Shell = ({ complexity }) => {
    const [numbers, setNumbers] = useState([]);
    const [indexes, setIndexes] = useState([]);
    const [result, setResult] = useState({});
    const [numbersText, setNumbersText] = useState("");

    const generateRandom = () => {
        const cant = prompt("Ingrese la cantidad de números", "1000");
        const min = prompt("Ingrese el valor minimo", "0");
        const max = prompt("Ingrese el valor maximo", "10000");
        const decimales = prompt("Ingrese la cantidad de decimales", "0");
        const input = arregloRandomico(
            Number(cant),
            Number(min),
            Number(max),
            Number(decimales)
        );
        setNumbersText(input.toString());
    };

    const setText = (e) => {
        e.preventDefault();
        setNumbersText(e.target.value);
    };

    const sort = () => {
        const input = convertirArregloNumeros(numbersText);
        const resultObject = execTimeShellSort(input);
        setNumbersText(resultObject.result.toString());
        setResult(resultObject);
    };

    const showAnimation = () => {
        setNumbers(result[0].array);

        const loop = (index) => {
            if (index < result.length - 1) {
                setTimeout(() => {
                    setNumbers(result[index].array);
                }, 333);
                setTimeout(() => {
                    setIndexes(result[index + 1].indexes);
                }, 666);
                setTimeout(() => {
                    loop(index + 1);
                }, 1000);
            } else {
                setTimeout(() => {
                    setNumbers(result[result.length - 1].array);
                }, 333);
                setTimeout(() => {
                    setIndexes([]);
                }, 666);
            }
        };

        loop(0);
    };

    return (
        <div className="container">
            <Header title="Shell Sort" logo="/img/latam_logo.png" />
            <div className="container-textarea">
                <textarea row="200000" cols="5000" value={numbersText} onChange={setText} />
                <div className="button-container--vertical">
                    <Button text="Generar Aleatorios" onClick={generateRandom} />
                    <Button text="Ordenar" onClick={sort} />
                    <Button text="Animación" onClick={showAnimation} />
                </div>
            </div>
            <div className="time-container">
                <div className="theory-time">
                    <h4>Tiempo Teórico</h4>
                    <h5>
                        {complexity} = { result.theoreticalTime ? result.theoreticalTime + " ms." : null }
                    </h5>
                </div>

                <div className="real-time">
                    <h4>Tiempo Real</h4>
                    <h5>t = { result.realTime ? result.realTime + " ms." : null }</h5>
                </div>
                <AnimationContainer numbers={numbers} indexes={indexes} />
            </div>

            <Footer btnText="" dir="/Sort_MU.pdf" />

            {/* <Footer btnText="Ejecutar Transporte" dir="/Transporte_MU.pdf" /> */}
        </div>
    );
};

export default Shell;
