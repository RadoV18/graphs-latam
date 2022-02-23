import "./style.css";
import React from "react";
import Graph from "./components/Graph/Graph";
import Header from "./components/Header/Header";
import Toolbar from "./components/Toolbar/Toolbar";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";

function App() {
    return (
        <div className="App">
            <Modal />
            <Header />
            <Graph />
            <Toolbar />
            <Footer />
        </div>
    );
}

export default App;
