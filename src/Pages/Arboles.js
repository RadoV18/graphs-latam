import React from 'react';
import { useState } from 'react';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import Input from "../components/Input";
import '../Styles/arboles.css';

function Arboles() {
    const[datoArbol, setDatoArbol] = useState('');
    const[postOrder, setPostOrder] = useState('');
    const[preOrder, setPreOrder] = useState('');

  return (
    <div>
        <Header title="Árboles Binarios" logo="/img/latam_logo.png" />

        <div className="arboles__options--column">
            <div className="arboles__options--row">
                <Input text="Ingrese un Dato del Árbol" onChange={ event => setDatoArbol(event.target.value)}/>
                <Button text="Agregar" onClick={()=>{}} />
                <Button text="Mostrar Order" onClick={()=>{}} />
            </div>

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

export default Arboles