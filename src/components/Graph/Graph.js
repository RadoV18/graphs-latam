import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCytoscape } from "../../redux/actions/cytoscape";
import { setSourceNode, setTargetNode } from "../../redux/actions/edgeCreator";
import { addEdgeId } from "../../redux/actions/edgeIds";
import cytoscape from "cytoscape";

const Graph = () => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => state.toolbar);
    const cytoscapeData = useSelector((state) => state.cytoscapeData);
    const sourceNode = useSelector((state) => state.edgeCreator.source);
    const edgeIds = useSelector((state) => state.edgeIds);

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
                // text input
                cy.add({
                    data: { id: e.timeStamp },
                    position: e.position,
                });
                dispatch(setCytoscape(cy.json()));
            }
        });
    } else if (toolbar.edge) {
        cy.removeListener("tap");
        cy.on("tap", (e) => {
            if (e.target !== cy) {
                if (sourceNode === "") {
                    dispatch(setSourceNode(e.target._private.data.id));
                } else {
                    const initialId = sourceNode + "-" + e.target._private.data.id;

                    const validatedId = edgeIds.filter((edge) =>
                        edge.startsWith(initialId)
                    );

                    let num = 0;
                    if(validatedId.length > 0) {
                        const separated = validatedId[validatedId.length - 1].split('-');
                        num = Number(separated[separated.length - 1]) + 1;
                    }

                    const id = sourceNode + "-" + e.target._private.data.id + "-" + num;

                    cy.add({
                        data: {
                            id,
                            source: sourceNode,
                            target: e.target._private.data.id,
                        },
                    });
                    dispatch(addEdgeId(id));
                    dispatch(setCytoscape(cy.json()));
                    dispatch(setSourceNode(""));
                }
            }
        });
    } else if (toolbar.eraser) {
        console.log("eraser is active");
        cy.removeListener("tap");
        cy.on("tap", (e) => {
            const toDelete = cy.$(`#${e.target._private.data.id}`);
            cy.remove(toDelete);
        });
    }
    return <div id="cy"></div>;
};

export default Graph;
