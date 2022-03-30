import React, { useState, useEffect } from "react";
import cytoscape from "cytoscape";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../TextInput/TextInput";
import { setText } from "../../redux/actions/textInput";
import { setDisplay } from "../../redux/actions/modalStyle";
import { addState } from "../../redux/actions/cytoscape";
import { nextIndex } from "../../redux/actions/currentIndex";
import { addEdgeId } from "../../redux/actions/edgeIds";
import { setSourceNode, setTargetNode } from "../../redux/actions/edgeCreator";
import { setMatrixDisplay } from "../../redux/actions/adjacencyMatrix";
import AdjacencyMatrix from "../AdjacencyMatrix/AdjacencyMatrix";
import "./Modal.css";

const Modal = () => {
    const dispatch = useDispatch();
    const textInput = useSelector((state) => state.textInput);
    const toolbar = useSelector((state) => state.toolbar);
    const modalStyle = useSelector((state) => state.modalStyle);
    const currentIndex = useSelector((state) => state.currentIndex);
    const cytoscapeData = useSelector(
        (state) => state.cytoscapeData[currentIndex]
    );
    const newNode = useSelector((state) => state.nodeCreator);
    const newEdge = useSelector((state) => state.edgeCreator);
    const edgeIds = useSelector((state) => state.edgeIds);
    const adjacencyMatrix = useSelector((state) => state.adjacencyMatrix);

    const [errorMessage, setErrorMessage] = useState(null);

    const [cy, setCy] = useState(cytoscape());

    useEffect(() => {
        const newCy = cytoscape({
            container: document.getElementById("cy"),
            style: cytoscapeData.style,
            zoomingEnabled: false,
            userZoomingEnabled: false,
            panningEnabled: false,
            userPanningEnabled: false,
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

    let message = "";

    if (toolbar.node === true) {
        message = "Ingrese el nombre del vértice:";
    } else if (toolbar.edge === true) {
        message = "Ingrese el costo de la arista:";
    }

    const change = (e) => {
        dispatch(setText(e.target.value));
    };

    const addNode = () => {
        try {
            if (textInput === "") {
                throw new TypeError();
            }
            cy.add({
                data: { id: textInput.replace(/\s+/g, "") },
                scratch: { label: textInput },
                position: newNode.position,
            });
            dispatch(addState(cy.json(), currentIndex));
            dispatch(nextIndex());
            dispatch(setDisplay("none"));
            dispatch(setText(""));
        } catch (error) {
            if (error instanceof TypeError) {
                setErrorMessage("Ingrese un nombre válido.");
            } else {
                setErrorMessage("Error, vértice duplicado.");
            }
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const addEdge = () => {
        try {
            const weight = Number(textInput);

            if (Number.isNaN(weight) || weight < 0) {
                throw new TypeError();
            }

            const { source, target } = newEdge;

            const initialId = source + "-" + target;
            const validatedId = edgeIds.filter((edge) =>
                edge.startsWith(initialId)
            );

            const id = source + "-" + target;

            if (validatedId.length > 0) {
                const toRemove = cy.$(`#${id}`);
                cy.remove(toRemove);
            }
            cy.add({
                data: {
                    id,
                    source: source,
                    target: target,
                    weight,
                },
            });
            dispatch(addEdgeId(id));
            dispatch(addState(cy.json(), currentIndex));
            dispatch(nextIndex());
            dispatch(setSourceNode(""));
            dispatch(setTargetNode(""));
            dispatch(setDisplay("none"));
            dispatch(setText(""));
        } catch (error) {
            if (error instanceof TypeError) {
                setErrorMessage("Ingrese un costo válido.");
            } else {
                setErrorMessage("Error");
            }
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (toolbar.node === true) {
            addNode();
        } else if (toolbar.edge === true) {
            addEdge();
        }
    };

    const cancel = (e) => {
        dispatch(setDisplay("none"));
        dispatch(setSourceNode(""));
        dispatch(setTargetNode(""));
        dispatch(setText(""));
        dispatch(setMatrixDisplay(false));
    };
    
    if (adjacencyMatrix.display === true) {
        return (
            <div style={modalStyle} className="modal">
                <div className="modal-content modal-adjacencymatrix">
                    <AdjacencyMatrix />
                    <div className="modal-footer">
                        <button type="button" onClick={cancel}>
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        );
    }    

    return (
        <div style={modalStyle} className="modal">
            <div className="modal-content">
                <span>{message}</span>
                <form onSubmit={submit}>
                    <TextInput
                        value={textInput}
                        changeHandler={change}
                        name="textInput"
                        id="textInput"
                    />
                    {errorMessage ? (
                        <span className="modal-error">{errorMessage}</span>
                    ) : null}
                    <div className="modal-footer">
                        <button>Aceptar</button>
                        <button
                            type="button"
                            onClick={cancel}
                            className="btn-cancel"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
