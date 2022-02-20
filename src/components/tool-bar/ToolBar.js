import React from 'react';
import node from '../../img/node.png';
import back from '../../img/backw.png';
import eraser from '../../img/erase.png';
import redo from '../../img/redo.png';
import arista from '../../img/arista.png';
import './Tool-bar.css';

const  ToolBar = () => {
    return (
            <div className="tool-bar">
                <button><img src={node} alt="logo-node"/></button>
                <button><img src={arista} alt="aris"/></button>
                <button><img src={eraser} alt="logo-eraser"/></button> 
                <button><img src={back} alt="logo-back"/></button> 
                <button><img src={redo} alt="logo-redo"/></button>
            </div>
        );
};
export default ToolBar;