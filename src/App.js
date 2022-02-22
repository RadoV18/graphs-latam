import "./style.css";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Graph from "./components/Graph/Graph";
import Header from "./components/Header/Header";
import cytoscape from "cytoscape";
import Toolbar from "./components/Toolbar/Toolbar";
import Footer from "./components/Footer/Footer";

function App() {
    const [cy, setCy] = useState(cytoscape());
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const [addNode, setAddNode] = useState(false);
    const [addEdge, setAddEdge] = useState(false);
    
    const [selectedNode, setSelectedNode] = useState("");
    const [nodeCollection, setNodeCollection] = useState(cy.collection());

    const setAllFalse = () => {
        setAddNode(false);
        setAddEdge(false);
    };

    useEffect(() => {
        if (addNode) {
            cy.removeListener("tap");
            console.log("add node");
            setAllFalse();
            setAddNode(true);
            cy.on("tap", (e) => {
                if (e.target === cy) {
                    // text input
                    cy.add({
                        data: { id: e.timeStamp },
                        position: e.position,
                    });
                }
            });
        }
    }, [addNode]);

    useEffect(() => {
        if(selectedNode !== "") {
            const node = cy.nodes("#" + selectedNode);
            console.log("Node", node);
            setNodeCollection(nodeCollection.union(node));
            setSelectedNode("");
        }
    }, [selectedNode]);

    useEffect(() => {
        if(nodeCollection.length === 2) {
            const source = nodeCollection[0]._private.data.id
            const target = nodeCollection[1]._private.data.id
            const id = source + "-" + target; 
            cy.add({
                data: {
                    id,
                    source,
                    target
                }
            });
            setNodeCollection(cy.collection());
        }
    }, [nodeCollection]);

    useEffect(() => {
        if(addEdge) {
            cy.removeListener("tap");
            console.log("add edge");
            setAllFalse();
            setAddEdge(true);
            cy.nodes().on("tap", (e) => {
                console.log("tap");
                setSelectedNode(e.target._private.data.id);
            });
        }
    }, [addEdge]);

    const onMouseMove = (event) => {
        setMousePosition({
            x: event.screenX,
            y: event.screenY,
        });
    };

    // TODO: aqui le meten la matriz de adyacencia
    const adjacencyMatrix = () => {
        // lista de nodos
        let nodes = cy.$("node");
        nodes.forEach((element) => {
            console.log(element.data());
        });
        // lista de aristas
        let edges = cy.$("edge");
        edges.forEach((element) => {
            console.log(element.data());
        });
    };

    return (
        <div className="App">
            <Header />
            <Graph />
            <Toolbar />
            <Footer />
        </div>
    );
}

export default App;
