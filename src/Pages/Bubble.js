import React, { useState } from "react";
import "../Styles/selection.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import AnimationContainer from "../components/AnimationContainer/AnimationContainer";

const Bubble = ({ complexity }) => {
    const result = [
        {
            array: [5, 2, 1],
            indexes: [-1, -1]
        },
        {
            array: [2, 5, 1],
            indexes: [0, 1]
        },
        {
            array: [2, 1, 5],
            indexes: [1, 2]
        },
        {
            array: [1, 2, 5],
            indexes: [0, 1]
        }
    ]

    const [numbers, setNumbers] = useState([]);
    const [indexes, setIndexes] = useState([]);
    const showAnimation = () => {
        setNumbers(result[0].array);

        const loop = (index) => {
            if(index < result.length) {
                setTimeout(() => {
                    setNumbers(result[index].array);
                    setIndexes(result[index].indexes);
                    loop(index + 1);
                }, 1500);
            } else {
                setTimeout(() => {
                    setIndexes([]);
                }, 1500);
            }
        }

        loop(0);
    };

    return (
        <div className="container">
            <Header title="Bubble Sort" logo="/img/latam_logo.png" />
            <div className="container-textarea">
                <textarea row="200000" cols="5000" />
                <div className="button-container">
                    <Button text="Generar Aleatorios" />
                    <Button text="Ordenar" />
                    <Button text="Animación" onClick={showAnimation} />
                </div>
            </div>
            <div className="time-container">
                <div className="theory-time">
                    <h4>Tiempo Teórico</h4>
                    <h5>
                        {complexity} = {}
                    </h5>
                </div>

                <div className="real-time">
                    <h4>Tiempo Real</h4>
                    <h5>t = {}</h5>
                </div>
            </div>
            <AnimationContainer numbers={numbers} indexes={indexes} />
            {/* <Footer btnText="Ejecutar Transporte" dir="/Transporte_MU.pdf" /> */}
        </div>
    );
};

export default Bubble;
