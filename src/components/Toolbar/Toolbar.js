import React from 'react';
// TODO: useSelector to toggle button
import { useDispatch } from "react-redux";

// action creators
import { setNodeActive, setEdgeActive, setEraserActive, disableAll } from "../../redux/actions/toolbar";

import node from '../../img/node.png';
import back from '../../img/backw.png';
import eraser from '../../img/erase.png';
import redo from '../../img/redo.png';
import arista from '../../img/arista.png';
import './Tool-bar.css';

const Toolbar = () => {
    const dispatch = useDispatch();

    const setNode = () => {
        dispatch(disableAll());
        dispatch(setNodeActive());
    }

    const setEdge = () => {
        dispatch(disableAll());
        dispatch(setEdgeActive());
    }

    const setEraser = () => {
        dispatch(disableAll());
        dispatch(setEraserActive());
    }

    return (
            <div className="tool-bar">
                <button title="Agregar vértice" onClick={setNode}><img src={node} alt="logo-node"/></button>
                <button title="Agregar arista" onClick={setEdge}><img src={arista} alt="aris"/></button>
                <button title="Borrar elemento" onClick={setEraser}><img src={eraser} alt="logo-eraser"/></button> 
                <button title="Deshacer"><img src={back} alt="logo-back"/></button> 
                <button title="Rehacer"><img src={redo} alt="logo-redo"/></button>
            </div>
        );
};
export default Toolbar;