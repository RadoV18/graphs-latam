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
    const[datoArbol, setDatoArbol] = useState('');
    const[listArbol, setListArbol] = useState([]);
    const[ordenArbol, setOrdenArbol] = useState([]);
    const[postOrder, setPostOrder] = useState('');
    const[preOrder, setPreOrder] = useState('');

    const currentIndex = useSelector((state) => state.currentIndex);
    const data = useSelector((state) => state.cytoscapeData[currentIndex]);

    function convertirCadena (input){
        input.replace(/\s+/g, "");
        var arreglo = input.split(",");
        arreglo = arreglo.map((elem) => parseInt(elem));
        return arreglo;
    }

    function agregarDatoList () {
        var arreglo = convertirCadena(datoArbol);
        var newArreglo = [];
        var flag = compararArrays(arreglo, listArbol);
        if(!flag){
            newArreglo = listArbol.concat(arreglo);
        }else{
            alert("Un dato ingresado se repite y no se lo puede agregar");
            newArreglo = listArbol.slice();
        }
        return newArreglo;
    }

    function compararArrays (v1, v2){
        var flag = false;
        for(let x=0;x<v1.lenght; x++){
            for(let i=0;i<v2.lenght;i++){
                if(v1[x] === v2[i]){
                    flag = true;
                }
            }
        }
        return flag;
    }
    
    const generarArbol = () => {
        //Recibir la lista de arboles
        var arreglo = agregarDatoList();
        setListArbol(arreglo);
        const [node, edge, orden] = binaryTree(arreglo); //Prueba
        setOrdenArbol(orden);
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

    const mostrarOrden = () => {
        var cadena = "IN ORDER:  ";
        for(let i=0; i<ordenArbol[0][0].length; i++){
            cadena = cadena + ordenArbol[0][0][i] +", ";
        }
        cadena = cadena +"\nPOST ORDER:  ";
        for(let i=0; i<ordenArbol[1][0].length;i++){
            cadena = cadena + ordenArbol[1][0][i]+", ";
        }
        cadena = cadena +"\nPRE ORDER:  ";
        for(let i=0; i<ordenArbol[2][0].length;i++){
            cadena = cadena + ordenArbol[2][0][i]+", ";
        }
        alert(cadena);
    };

    return (
        <div className="arboles__container">
            <Header title="Árboles Binarios" logo="/img/latam_logo.png" />
            <div className="arboles__options--column">
                <div className="arboles__options--row">
                    <Input text="Ingrese un Dato del Árbol" onChange={ event => setDatoArbol(event.target.value) }/>
                    <Button text="Agregar" onClick={generarArbol} />
                    <Button text="Mostrar Order" onClick={mostrarOrden} />
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
    );
}

export default Arboles;