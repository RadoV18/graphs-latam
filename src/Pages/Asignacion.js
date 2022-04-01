import React from 'react';
import { useState } from 'react';
import Graph from "../components/Graph/Graph";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import '../Styles/asignacion.css';
import Button from "../components/Button/Button";


const Asignacion = () => {
  const [matrix, setMatrix] = useState([]);
  const addColumn = () => {
    let value = "aa";
      //Se hace un push del valor que se ingresa en el modal
      matrix.push(value);
      console.log(value);
      return(
        <h2>Hola</h2>
      );
  }

  return (
    <div className="container">
        <Header title="Algoritmo de Asignación" logo="" />
        <div className="action">
            <Button text="Añadir columna" onClick={addColumn}/>
            <Button text="Añadir fila" onClick={addColumn}/>
        </div>
        <Footer btnText="Ejecutar Asignacion"  />
    </div>
  )
}

export default Asignacion;