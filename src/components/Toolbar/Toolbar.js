import React from "react";
import { useDispatch, useSelector } from "react-redux";

// action creators
import {
    setNodeActive,
    setEdgeActive,
    setEraserActive,
    disableAll,
} from "../../redux/actions/toolbar";
import { nextIndex, previousIndex } from "../../redux/actions/currentIndex";
import { setTargetNode, setSourceNode } from "../../redux/actions/edgeCreator";

import "./Tool-bar.css";

const Toolbar = () => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => state.toolbar);
    const cytoscapeArray = useSelector((state) => state.cytoscapeData);
    const currentIndex = useSelector((state) => state.currentIndex);

    const nodeSelected = toolbar.node;
    const edgeSelected = toolbar.edge;
    const eraserSelected = toolbar.eraser;

    const setNode = () => {
        dispatch(disableAll());
        dispatch(setTargetNode(""));
        dispatch(setSourceNode(""));
        dispatch(setNodeActive());
    };

    const setEdge = () => {
        dispatch(disableAll());
        dispatch(setTargetNode(""));
        dispatch(setSourceNode(""));
        dispatch(setEdgeActive());
    };

    const setEraser = () => {
        dispatch(disableAll());
        dispatch(setTargetNode(""));
        dispatch(setSourceNode(""));
        dispatch(setEraserActive());
    };

    const undoAction = () => {
        dispatch(previousIndex());
        dispatch(setTargetNode(""));
        dispatch(setSourceNode(""));
    };

    const redoAction = () => {
        dispatch(setTargetNode(""));
        dispatch(setSourceNode(""));
        if (currentIndex + 1 < cytoscapeArray.length) {
            dispatch(nextIndex());
        }
    };

    return (
        <div className="tool-bar">
            <button
                title="Agregar vértice"
                onClick={setNode}
                className={nodeSelected ? "selected" : ""}
            >
                <img src="/img/node.png" alt="logo-node" />
            </button>
            <button
                title="Agregar arista"
                onClick={setEdge}
                className={edgeSelected ? "selected" : ""}
            >
                <img src="/img/arista.png" alt="aris" />
            </button>
            <button
                title="Borrar elemento"
                onClick={setEraser}
                className={eraserSelected ? "selected" : ""}
            >
                <img src="/img/erase.png" alt="logo-eraser" />
            </button>
            <button title="Deshacer" onClick={undoAction}>
                <img src="/img/backw.png" alt="logo-back" />
            </button>
            <button title="Rehacer" onClick={redoAction}>
                <img src="/img/redo.png" alt="logo-redo" />
            </button>
        </div>
    );
};
export default Toolbar;
