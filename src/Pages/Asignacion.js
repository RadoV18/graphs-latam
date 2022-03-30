import React from 'react';
import Graph from "../components/Graph/Graph";
import Header from "../components/Header/Header";
import Toolbar from "../components/Toolbar/Toolbar";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import '../Styles/asignacion.css';

const execAlgo = () => {

}
const Asignacion = () => {
  return (
    <div>
        <Header title="Algoritmo de Asignación" logo="" />
        <Footer btnText="Ejecutar Asignacion" onClick={execAlgo} />
    </div>
  )
}

export default Asignacion