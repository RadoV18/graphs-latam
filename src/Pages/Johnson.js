import React, { useState } from "react";
import Graph from "../components/Graph/Graph";
import Header from "../components/Header/Header";
import Toolbar from "../components/Toolbar/Toolbar";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import { useSelector } from "react-redux";
import popper from "cytoscape-popper";
import cytoscape from "cytoscape";
import { generateMatrix } from "../utils/adjacencyMatrix";

const Johnson = () => {
    const currentIndex = useSelector((state) => state.currentIndex);
    const data = useSelector((state) => state.cytoscapeData[currentIndex]);
    const [cy, setCy] = useState(cytoscape());

    const onClick = () => {
        // ejecutar algoritmo
        // const johnsonData = johnsonsAlgorithm(generateMatrix(data.elements));
        const johnsonData = {};

        // generar poppers
        const makePopperNode = (node) => {
            const popper = node.popper({
                content: () => {
                    const div = document.createElement("div");
                    div.classList.add("popper-div");
                    div.innerHTML = `<table class=${node.isCritical ? "node--critical" : ""}>
                                    <tr>
                                        <td>${node.earlyStart}</td>
                                        <td>${node.latestFinish}</td>
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

        //Agregando los popper a cada nodo
        johnsonData.nodes.forEach((e) => {
            const node = cy.$(`#${e.id}`);
            const popperNode = makePopperNode(
                node,
                e.earlyStart,
                e.latestFinish
            );
            let updateNode = () => {
                popperNode.update();
            };
            node.on("position", updateNode);
            cy.on("drag", updateNode);
        });

        //Agregando los poppers a cada edge
        johnsonData.edges.forEach((e) => {
            const edge = cy.$(`#${e.id}`);
            const popperEdge = makePopperEdge(edge, e.slag);
            let updateEdge = () => {
                popperEdge.update();
            };
            edge.connectedNodes().on("position", updateEdge);
            cy.on("drag", updateEdge);
        });
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
};

export default Johnson;
