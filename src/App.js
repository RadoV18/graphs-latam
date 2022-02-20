import "./style.css";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import cytoscape from "cytoscape";
import edgehandles from "cytoscape-edgehandles";
cytoscape.use(edgehandles);

function App() {
    const [cy, setCy] = useState(cytoscape());
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
                    data: { id: "ab", source: "a", target: "b" },
                },
            ],
        });
        newCy.edgehandles();
        setCy(newCy);
    }, []);

    const [add, setAdd] = useState(false);
    const toggleAdd = () => {
        setAdd(!add);
    };

    useEffect(() => {
        if (add) {
            cy.on("tap", (e) => {
                if (e.target === cy) {
                    cy.add({
                        data: { id: e.timeStamp },
                        position: e.position,
                    });
                }
            });
        } else {
            cy.removeListener("tap");
        }
    }, [add]);

    const onMouseMove = (event) => {
        setMousePosition({
            x: event.screenX,
            y: event.screenY,
        });
    };

    return (
        <div className="App">
            <button onClick={toggleAdd}>
                {add ? "add enabled" : "add disabled"}
            </button>
            <div id="cy" onMouseMove={onMouseMove}>
            </div>
        </div>
    );
}

export default App;
