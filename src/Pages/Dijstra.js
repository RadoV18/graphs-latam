import React from "react";
import { useDispatch } from "react-redux";
import Graph from "../components/Graph/Graph";
import Header from "../components/Header/Header";
import Toolbar from "../components/Toolbar/Toolbar";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import { useSelector } from "react-redux";
import { johnsonsAlgorithm } from "../utils/algorithms/johnsons";
import popper from "cytoscape-popper";
import cytoscape from "cytoscape";
import { generateMatrix } from "../utils/adjacencyMatrix";
import {
    setAdjacencyMatrix,
    setMatrixLabels,
    setMatrixDisplay,
} from "../redux/actions/adjacencyMatrix";
import { setDisplay } from "../redux/actions/modalStyle";

import "../Styles/johnson.css";


cytoscape.use(popper);

const Dijstra = () => {
    const dispatch = useDispatch();
    const currentIndex = useSelector((state) => state.currentIndex);
    const data = useSelector((state) => state.cytoscapeData[currentIndex]);

    const onClick = () => {
        // ejecutar algoritmo
        // console.log();
        const { adjacencyMatrix, indexes } = generateMatrix(data.elements);
        dispatch(setAdjacencyMatrix(adjacencyMatrix));
        dispatch(setMatrixLabels(Array.from(indexes)));
        dispatch(setMatrixDisplay(true));
        dispatch(setDisplay("block"));
        console.log("click");
        const johnsonData = johnsonsAlgorithm({ adjacencyMatrix, indexes });
        console.log(johnsonData);

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
                    cy.add(element);
                });
            }
        }

        // generar poppers
        const makePopperNode = (node, earlyStart, latestFinish, isCritical) => {
            const popper = node.popper({
                content: () => {
                    const div = document.createElement("div");
                    div.classList.add("popper-div");
                    div.innerHTML = `<table class="${
                        isCritical ? "node node--critical" : "node"
                    }">
                                    <tr>
                                        <td>${earlyStart}</td>
                                        <td>${latestFinish}</td>
                                    </tr>
                               </table>`;
                    document.body.appendChild(div);
                    return div;
                },
                popper: {
                    placement: "bottom",
                },
            });
            return popper;
        };

        const makePopperEdge = (edge, value) => {
            const popper = edge.popper({
                content: () => {
                    const div = document.createElement("div");
                    div.classList.add("popper-div");
                    div.innerHTML = "h = " + value;
                    document.body.appendChild(div);
                    return div;
                },
                popper: {
                    placement: "bottom",
                },
            });
            return popper;
        };
        var nodeCritical = " ";
        //Agregando los popper a cada nodo
        johnsonData.nodes.forEach((e) => {
            //Obtenemos la referencia del nodo del cy declarado
            const node = cy.getElementById(e.label);
            //Se envia la referencia del nodo y los valores de los poppers
            const popperNode = makePopperNode(
                node,
                e.earlyStart,
                e.latestFinish,
                e.isCritical
            );
            if (e.isCritical) {
                nodeCritical = nodeCritical + e.label + ", ";
            }
            let updateNode = () => {
                popperNode.update();
            };
            node.on("position", updateNode);
            cy.on("render", updateNode);
        });

        //Agregando los poppers a cada edge
        johnsonData.edges.forEach((e) => {
            //Concatenamos el valor del source y target para obtener el id
            const edge = cy.getElementById(
                e.source[0] + "-" + e.destination[0]
            );
            //Aca igual se envia la referencia del edge y el valor de la holgura
            const popperEdge = makePopperEdge(edge, e.slag);
            let updateEdge = () => {
                popperEdge.update();
            };
            edge.connectedNodes().on("position", updateEdge);
            cy.on("render", updateEdge);
        });

        //CUADRO INDICA CAMINO CRITICO
        const popper = cy.popper({
            content: () => {
                const div = document.createElement("div");
                div.classList.add("popper-div");
                div.innerHTML = `<div>CAMINO CRITICO  <p class="square"> ${nodeCritical} </p></div>`;
                document.body.appendChild(div);
                return div;
            },
            renderedPosition: () => ({ x: 0, y: 0 }),
            popper: {
                placement: "bottom",
            },
        });
    };

    return (
        <div className="container">
            <Modal />
            <Header logo="/img/latam_logo.png" />
            <Graph />
            <Toolbar />
            <Footer btnText="Ejecutar Algoritmo de Dijstra" onClick={onClick} dir="/doc.pdf"/>
        </div>
    );
};

export default Dijstra;
