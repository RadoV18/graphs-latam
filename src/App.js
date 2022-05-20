import React from "react";
import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";
import Main from "./Pages/Main";
import Johnson from "./Pages/Johnson";
import Asignacion from "./Pages/Asignacion";
import Transporte from "./Pages/Transporte";
import Selection from "./Pages/Selection";
import Insertion from "./Pages/Insertion";
import Bubble from "./Pages/Bubble";
import Merge from "./Pages/Merge";
import Shell from "./Pages/Shell";
import Dijstra from "./Pages/Dijstra";
import Kruskal from "./Pages/Kruskal";

import Arboles from "./Pages/Arboles";


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
                <Route path="/grafos/transporte">
                    <Transporte />
                </Route>
                {/* SORT */}
                <Route path="/sort/selection">
                    <Selection complexity="O(n^2)" animation={false}/>
                </Route>
                <Route path="/sort/insertion">
                    <Insertion complexity="O(n^2)" animation={false}/>
                </Route>
                <Route path="/sort/bubble">
                    <Bubble complexity="O(n^2)" animation={true}/>
                </Route>
                <Route path="/sort/merge">
                    <Merge complexity="O(n*log(n))" animation={false}/>
                </Route>
                <Route path="/sort/shell">
                    <Shell complexity="O(n*log(n))" animation={false}/>
                </Route>
                {/* ARBOLES */}
                <Route path="/arboles">
                    <Arboles />
                </Route>
                <Route path="/dijkstra">
                    <Dijstra />
                </Route>
                <Route path="/kruskal">
                    <Kruskal />
                </Route>
                <Route path="/">
                    <Home deletePoppers={deletePoppers} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
