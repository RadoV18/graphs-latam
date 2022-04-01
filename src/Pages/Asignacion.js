import React from 'react';
import { useState } from 'react';
import Graph from "../components/Graph/Graph";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import '../Styles/asignacion.css';
import Button from "../components/Button/Button";
import AsignacionTable from "../components/AsignacionTable/AsignacionTable";


const Asignacion = () => {

  const [matrix, setMatrix] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);

  return (
    <div className="container">
        <Header title="Algoritmo de Asignación" logo="" />
        <AsignacionTable matrix={matrix} setMatrix={setMatrix}/>
        <Footer btnText="Ejecutar Asignacion"  />
    </div>
  )
}

export default Asignacion;