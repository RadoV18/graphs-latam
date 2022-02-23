import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCytoscape } from "../../redux/actions/cytoscape";
import { setSourceNode, setTargetNode } from "../../redux/actions/edgeCreator";
import { setDisplay } from "../../redux/actions/modalStyle";
import { setNewNodePosition } from "../../redux/actions/nodeCreator";
import cytoscape from "cytoscape";

const Graph = () => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => state.toolbar);
    const cytoscapeData = useSelector((state) => state.cytoscapeData);
    const sourceNode = useSelector((state) => state.edgeCreator.source);

    const [cy, setCy] = useState(cytoscape());

    useEffect(() => {
        console.log(cytoscapeData);
        const newCy = cytoscape({
            container: document.getElementById("cy"),
            style: cytoscapeData.style,
            zoom: cytoscapeData.zoom,
            pan: cytoscapeData.pan,
        });
        if (cytoscapeData.elements) {
            if (cytoscapeData.elements.nodes) {
                cytoscapeData.elements.nodes.forEach((element) => {
                    newCy.add(element);
                });
            }
            if (cytoscapeData.elements.edges) {
                cytoscapeData.elements.edges.forEach((element) => {
                    newCy.add(element);
                });
            }
        }
        setCy(newCy);
    }, [cytoscapeData]);

    if (toolbar.node) {
        cy.removeListener("tap");
        cy.on("tap", (e) => {
            if (e.target === cy) {
                dispatch(setDisplay("block"));
                dispatch(setNewNodePosition(e.position));
            }
        });
    } else if (toolbar.edge) {
        cy.removeListener("tap");
        cy.on("tap", (e) => {
            if (e.target !== cy) {
                if (sourceNode === "") {
                    dispatch(setSourceNode(e.target._private.data.id));
                } else {
                    dispatch(setTargetNode(e.target._private.data.id));
                    dispatch(setDisplay("block"));
                }
            }
        });
    } else if (toolbar.eraser) {
        console.log("eraser is active");
        cy.removeListener("tap");
        cy.on("tap", (e) => {
            const toDelete = cy.$(`#${e.target._private.data.id}`);
            cy.remove(toDelete);
            dispatch(setCytoscape(cy.json()));
        });
    }
    return <div id="cy"></div>;
};

export default Graph;
