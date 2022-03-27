import React from 'react';
import Graph from "../components/Graph/Graph";
import Header from "../components/Header/Header";
import Toolbar from "../components/Toolbar/Toolbar";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import { useSelector } from "react-redux";

const Johnson = () => {
    const currentIndex = useSelector((state) => state.currentIndex);
    const data = useSelector((state) => state.cytoscapeData[currentIndex]);

    const onClick = () => {
        // ejecutar algoritmo
        // generar poppers
    };

    return (
        <div className="container">
            <Modal />
            <Header />
            <Graph />
            <Toolbar />
            <Footer btnText="Ejecutar Algoritmo de Johnson" onClick={onClick} />
        </div>
    );
}

export default Johnson