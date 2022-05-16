import React from "react";
import { useDispatch } from "react-redux";
import Graph from "../components/Graph/Graph";
import Header from "../components/Header/Header";
import Toolbar from "../components/Toolbar/Toolbar";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import { useSelector } from "react-redux";
import { kruskal } from "../utils/graphs/kruskal";
import popper from "cytoscape-popper";
import cytoscape from "cytoscape";
import { generateMatrix } from "../utils/adjacencyMatrix";
import {
    setAdjacencyMatrix,
    setMatrixLabels,
} from "../redux/actions/adjacencyMatrix";

import "../Styles/johnson.css";


cytoscape.use(popper);

const Kruskal = () => {
    const dispatch = useDispatch();
    const currentIndex = useSelector((state) => state.currentIndex);
    const data = useSelector((state) => state.cytoscapeData[currentIndex]);

    const onClick = () => {
        // ejecutar algoritmo
        // console.log();
        const { adjacencyMatrix, indexes } = generateMatrix(data.elements);
        dispatch(setAdjacencyMatrix(adjacencyMatrix));
        dispatch(setMatrixLabels(Array.from(indexes)));
        let fixedAdjMatrix = [];
        adjacencyMatrix.forEach(row => {
            let newRow = [];
            row.forEach(column => newRow.push(column === -1 ? 0 : column))
            fixedAdjMatrix.push(newRow);
        })
        const vertexList = [];
        indexes.forEach((e) => vertexList.push(e[1]));
        const indexMap = new Map(indexes);
        const kruskalResult = kruskal(vertexList, fixedAdjMatrix);
        const labelMap = new Map();
        kruskalResult.result.forEach(edge => {
            const source = indexes[edge[0]][0];
            const target = indexes[edge[1]][0];
            const edgeString = `${source}-${target}`;
            labelMap.set(edgeString, 1);
        });
        
        //No se si es valido pero funca
        //generamos un cy con los valores obtenidos del estado
        const cy = cytoscape({
            container: document.getElementById("cy"),
            style: data.style,
            zoomingEnabled: false,
            userZoomingEnabled: true,
            panningEnabled: true,
            userPanningEnabled: true,
        });
        if (data.elements) {
            if (data.elements.nodes) {
                data.elements.nodes.forEach((element) => {
                    cy.add(element);
                });
            }
            if (data.elements.edges) {
                data.elements.edges.forEach((element) => {
                    if(labelMap.get(element.data.id) === 1) {
                        element.style = {
                            'color': 'green',
                            'line-color': 'green',
                            'target-arrow-color': 'green',
                            'width': '5'
                        }
                    }
                    cy.add(element);
                });
            }
        }
    };

    return (
        <div className="container">
            <Modal />
            <Header logo="/img/latam_logo.png" />
            <Graph />
            <Toolbar />
            <Footer btnText="Ejecutar Algoritmo de Kruskal" onClick={onClick} dir="/doc.pdf"/>
        </div>
    );
};

export default Kruskal;
