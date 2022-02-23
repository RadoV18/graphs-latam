import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setAdjacencyMatrix, setMatrixLabels } from "../../redux/actions/adjacencyMatrix"; 
import { useHistory } from "react-router-dom";
import Button from '../Button/Button';
import './Footer.css';

const Footer = () => {
    const dispatch = useDispatch();
    const currentIndex = useSelector((state) => state.currentIndex);
    const data = useSelector((state) => state.cytoscapeData[currentIndex]);
    const history = useHistory();

    const generateMatrix = () => {
        console.log("Generate adjacency matrix...");
        console.log(data);
        if(!data.elements) {
            return;
        }

        const {nodes, edges} = data.elements;

        const indexes = new Map();
        const adjacencyMatrix = [];

        nodes.forEach((node, index) => {
            indexes.set(node.data.id, index);
            adjacencyMatrix.push([]);
            for(let i = 0; i < nodes.length; i++) {
                adjacencyMatrix[index].push(0);
            }
        });

        if(edges !== undefined) {
            edges.forEach(edge => {
                const { source, target, weight } = edge.data;
                const sourceIndex = indexes.get(source);
                const targetIndex = indexes.get(target);
                adjacencyMatrix[sourceIndex][targetIndex] = weight;
            });
        }

        dispatch(setAdjacencyMatrix(adjacencyMatrix));
        dispatch(setMatrixLabels(Array.from(indexes)));
    };

    const redirectToContactUs = () => {
        history.push("/contacto");
    }

    const openManual = () => {
        const newWindow = window.open(`http://localhost:3001/doc.pdf`, "_blank", "noopener,noreferrer");
        if(newWindow) {
            newWindow.opener = null;
        }
    }

    return (
        <div>
            <div className="footer">
                <div className="button-container">
                    <Button text="Salir de la aplicación" onClick={openManual}/>
                    <Button text="Generar Matriz de Adyacencia" onClick={generateMatrix}/>
                    <Button text="Contáctanos" onClick={redirectToContactUs}/>
                </div>
            </div>
        </div>
        );
};
export default Footer;