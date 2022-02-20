import "./style.css";
import React, { useEffect, useLayoutEffect, useState } from "react";
import cytoscape from "cytoscape";
import edgehandles from "cytoscape-edgehandles";
cytoscape.use(edgehandles);

function App() {
    const [cy, setCy] = useState(cytoscape());
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const [addNode, setAddNode] = useState(false);
    const [addEdge, setAddEdge] = useState(false);
    
    const [selectedNode, setSelectedNode] = useState("");
    const [nodeCollection, setNodeCollection] = useState(cy.collection());

    useLayoutEffect(() => {
        console.log("new cy");
        const newCy = cytoscape({
            container: document.getElementById("cy"),
            elements: [
                // list of graph elements to start with
                {
                    // node a
                    data: { id: "a" },
                },
                {
                    // node b
                    data: { id: "b" },
                },
                {
                    // edge ab
                    data: { id: "ab", source: "a", target: "b", weight: "10" },
                },
            ],
            style: [
                {
                    selector: "node",
                    style: {
                        label: "data(id)",
                        "text-valign": "center",
                        "text-halign": "center",
                    },
                },
                {
                    selector: "edge",
                    style: {
                        label: "data(weight)",
                        "target-arrow-shape": "triangle",
                        "target-arrow-color": "black",
                        "source-arrow-color": "black",
                        "line-color": "#333",
                        width: 1.5,
                        "curve-style": "bezier",
                    },
                }
            ],
        });
        newCy.edgehandles();
        setCy(newCy);
    }, []);

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
            <button onClick={() => setAddNode(true)}>
                {addNode ? "add node enabled" : "add node disabled"}
            </button>
            <button onClick={() => setAddEdge(true)}>
                {addEdge ? "add edge enabled" : "add edge disabled"}
            </button>
            <button onClick={adjacencyMatrix}>data</button>
            <div id="cy" onMouseMove={onMouseMove}></div>
        </div>
    );
}

export default App;
