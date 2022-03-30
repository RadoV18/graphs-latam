import React from 'react';
import Graph from "../components/Graph/Graph";
import Header from "../components/Header/Header";
import Toolbar from "../components/Toolbar/Toolbar";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import { useSelector } from "react-redux";
import popper from 'cytoscape-popper';
import { useState }  from 'react';o
import cytoscape from "cytoscape";

const Johnson = () => {
    const currentIndex = useSelector((state) => state.currentIndex);
    const data = useSelector((state) => state.cytoscapeData[currentIndex]);
    const cy = useState(cytoscape());

    const onClick = () => {
        // ejecutar algoritmo


        // generar poppers
        var makePooperNode = function (node,text1, text2){
          var popper = node.popper({
            content: () => {
              var div = document.createElement('div');
              div.classList.add('popper-div');
              div.innerHTML = "<table>"+
                                "<tr>"+
                                  "<td>"+text1+"</td>"+
                                  "<td>"+text2+"</td>"+
                                "</tr>"+
                              "</table>";
              document.body.appendChild( div );
              return div;
            },
            popper: {
              placement: 'bottom'
            }
          });
          return popper;
        };

        var makePopperEdge = function (edge,text1){
          var popper = edge.popper({
            content: () => {
              var div = document.createElement('div');
              div.classList.add('popper-div');
              div.innerHTML = "h = "+ text1;
              document.body.appendChild( div );
              return div;
            },
            popper: {
              placement: 'bottom'
            }
          });
          return popper;
        }
        
        const JohnsonData = [] // arreglo obtenido al ejecutar el algoritmo

        //Agregando los popper a cada nodo
        JohnsonData.nodes.forEach((e) =>{
          var node = cy.getElementById(e.id);
          var popperNode = makePooperNode(node, e.earlyStart, e.latestFinish);
          let updateNode = () => {
            popperNode.update();
          };
          node.on('position', updateNode);
          cy.on('drag', updateNode);
        });  
        
        //Agregando los poppers a cada edge
        Johnson.edges.forEach((e) => {
          var edge = cy.getElementById(e.id);
          var popperEdge = makePopperEdge(edge, e.slag);
          let updateEdge = () => {
            popperEdge.update();
          }
          edge.connectedNodes().on('position', updateEdge);
          cy.on('drag', updateEdge)
        });
    };

    return (
        <div className="container">
            <Modal />
            <Header title="Diseño de Grafos LATAM Airlines" logo="/img/latam_logo.png"/>
            <Graph />
            <Toolbar />
            <Footer btnText="Ejecutar Algoritmo de Johnson" onClick={onClick} />
        </div>
    );
}

export default Johnson