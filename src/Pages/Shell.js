import React from 'react';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";


const Shell = ({complexity}) => {
    return (
        <div className="container">
            <Header title="Shell Sort" logo="/img/latam_logo.png" />
            <div className="container-textarea">
                <textarea row="200000" cols="5000" />
                <div className="button-container">
                    <Button text="Generar Aleatorios" />
                    <Button text="Ordenar" />
                    <Button text="Animación" />

                </div>
            </div>
            <div className="time-container">
                <div className="theory-time">
                    <h4>Tiempo Teórico</h4>
                    <h5>{complexity} = { }</h5>
                </div>

                <div className="real-time">
                    <h4>Tiempo Real</h4>
                    <h5>t = { }</h5>
                </div>
            </div>

            {/* <Footer btnText="Ejecutar Transporte" dir="/Transporte_MU.pdf" /> */}

        </div>
    )
}

export default Shell