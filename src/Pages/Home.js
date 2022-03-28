import React from "react";
import Header from "../components/Header/Header";
import Title from "../components/Title";
import Card from "../components/Card";
import { useHistory } from "react-router-dom";
import "../Styles/home.css";




const Home = () => {
    const history = useHistory();

    const openGraphs = () => {
        history.push("/grafos/main");
    }

    const openJohnson = () => {
        history.push("/grafos/johnson");
    }

    return <div>
        <Header title={'Implementación  de  Algoritmos'} logo={''}/>
        <Title text={'Generación de Grafos'} />
        <div className="card-wrapper">
            <Card subtitle="Grafos" img="/img/Card/grafos.png" text="Representación de los grafos aplicados a la empresa LATAM" 
            buttonText="Grafos" onClick={openGraphs}/>
            <Card subtitle="Johnson" img="/img/Card/johnson.png" text="Algoritmo de Johnson" 
            buttonText="Johnson" onClick={openJohnson}/>
            
        </div>
    </div>
};

export default Home;
