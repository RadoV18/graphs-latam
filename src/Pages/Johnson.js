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

import "../Styles/johnson.css";

cytoscape.use(popper);

const Johnson = () => {
    const currentIndex = useSelector((state) => state.currentIndex);
    const data = useSelector((state) => state.cytoscapeData[currentIndex]);
    

    const onClick = () => {
        // ejecutar algoritmo
        // console.log();
        const johnsonData = johnsonsAlgorithm(generateMatrix(data.elements));
        
        //No se si es valido pero funca
        //generamos un cy con los valores obtenidos del estado
        const cy = cytoscape({
            container: document.getElementById("cy"),
            style: data.style,
            zoomingEnabled: true,
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
        };

        // generar poppers
        const makePopperNode = (node, earlyStart, latestFinish , isCritical) => {
            const popper = node.popper({
                content: () => {
                    const div = document.createElement("div");
                    div.classList.add("popper-div");
                    div.innerHTML = `<table class="${isCritical ? "node node--critical" : "node"}">
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
            let updateNode = () => {
                popperNode.update();
            };
            node.on("position", updateNode);
            cy.on("pan zoom resize", updateNode);
        });

        //Agregando los poppers a cada edge
        johnsonData.edges.forEach((e) => {
            //Concatenamos el valor del source y target para obtener el id
            const edge = cy.getElementById(e.source[0]+"-"+e.destination[0]);
            //Aca igual se envia la referencia del edge y el valor de la holgura
            const popperEdge = makePopperEdge(edge, e.slag);
            let updateEdge = () => {
                popperEdge.update();
            };
            edge.connectedNodes().on("position", updateEdge);
            cy.on("pan zoom resize", updateEdge);
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
