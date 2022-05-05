import React from 'react';
import { useState } from 'react';
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import Input from "../components/Input";
import '../Styles/arboles.css';
import cytoscape from "cytoscape";
import dagre from 'cytoscape-dagre';
import {binaryTree} from "../utils/tree/BinaryTree";

cytoscape.use( dagre );


function Arboles() {
    const[datoArbol, setDatoArbol] = useState([]);
    const[postOrder, setPostOrder] = useState('');
    const currentIndex = useSelector((state) => state.currentIndex);
    const data = useSelector((state) => state.cytoscapeData[currentIndex]);
    const[preOrder, setPreOrder] = useState('');

    

    const generarArreglo = (e) =>{
        e.preventDefault();
        datoArbol.push(e.target.value.Number)
        setDatoArbol(datoArbol);
    };
    
    const generarArbol = () => {
        //Recibir la lista de arboles
        const [node, edge, orden] = binaryTree("10,15,12,20,5,3,9,7,14,30"); //Prueba
        const cy = cytoscape({
            container: document.getElementById("cy"),
            style: data.style,
            layout: {
                name: "dagre",
                rankSep: 20,
                nodeSep: 20,
                ranker: 'tight-tree',
            },
            zoomingEnabled: false,
            userZoomingEnabled: true,
            panningEnabled: true,
            userPanningEnabled: true,
            elements: {nodes: node, edges:edge}
        }); 
    };

  return (
    <div className="arboles__container">
        <Header title="Árboles Binarios" logo="/img/latam_logo.png" />

        <div className="arboles__options--column">
            <div className="arboles__options--row">
                <Input text="Ingrese un Dato del Árbol" onChange={ generarArreglo }/>
                <Button text="Agregar" onClick={generarArbol} />
                <Button text="Mostrar Order" onClick={()=>{}} />
            </div>
            <div id="cy"></div>
            <div className="arboles__options--row">
                <Input text="Ingrese el PostOrder" onChange={ event => setPostOrder(event.target.value)} />
                <Input text="Ingrese el PreOrder" onChange={ event => setPreOrder(event.target.value)} />
                <Button text="Generar Árbol" onClick={()=>{}} />
            </div>
        </div>

        <Footer btnText="" dir="/Sort_MU.pdf" />

    </div>
  )
}

export default Arboles;