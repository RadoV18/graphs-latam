import React from "react";
import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";
import Main from "./Pages/Main";
import Johnson from "./Pages/Johnson";
import Asignacion from "./Pages/Asignacion";
import Transporte from "./Pages/Transporte";

function App() {
    const deletePoppers = () => {
        const className = "popper-div";
        const poppers = document.getElementsByClassName(className);
        while (poppers.length > 0) {
            poppers[0].parentNode.removeChild(poppers[0]);
        }
    };

    return (
        <Router>
            <Switch>
                <Route path="/contacto">
                    <ContactUs />
                </Route>
                <Route path="/grafos/main">
                    <Main />
                </Route>
                <Route path="/grafos/johnson">
                    <Johnson deletePoppers={deletePoppers} />
                </Route>
                <Route path="/grafos/asignacion">
                    <Asignacion />
                </Route>
                <Route path="/grafos/transporte">
                    <Transporte />
                </Route>
                <Route path="/">
                    <Home deletePoppers={deletePoppers} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
