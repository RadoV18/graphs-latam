import React from "react";
import Graph from "../components/Graph/Graph";
import Header from "../components/Header/Header";
import Toolbar from "../components/Toolbar/Toolbar";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";

const Main = () => {
    return (
        <div className="container">
            <Modal />
            <Header title="Diseño de Grafos LATAM Airlines" logo="../img/latam_logo.png"/>
            <Graph />
            <Toolbar />
            <Footer />
        </div>
    );
};

export default Main;
