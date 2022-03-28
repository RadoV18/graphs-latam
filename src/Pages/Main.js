import React from "react";
import Graph from "../components/Graph/Graph";
import Header from "../components/Header/Header";
import Toolbar from "../components/Toolbar/Toolbar";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import { generateMatrix } from '../utils/adjacencyMatrix';
import { setAdjacencyMatrix, setMatrixLabels, setMatrixDisplay } from "../redux/actions/adjacencyMatrix";
import { setDisplay } from '../redux/actions/modalStyle';

import { useSelector, useDispatch } from "react-redux";

const Main = () => {
    const dispatch = useDispatch();
    const currentIndex = useSelector((state) => state.currentIndex);
    const data = useSelector((state) => state.cytoscapeData[currentIndex]);

    const onClick = () => {
        try {
            const { adjacencyMatrix, indexes } = generateMatrix(data.elements);
            dispatch(setAdjacencyMatrix(adjacencyMatrix));
            dispatch(setMatrixLabels(Array.from(indexes)));
            dispatch(setMatrixDisplay(true));
            dispatch(setDisplay("block"));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <Modal />
            <Header title="Diseño de Grafos LATAM Airlines" logo="../img/latam_logo.png"/>
            <Graph />
            <Toolbar />
            <Footer btnText="Generar matriz de adyacencia" onClick={onClick} />
        </div>
    );
};

export default Main;
