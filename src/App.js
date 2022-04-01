import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";
import Main from "./Pages/Main";
import Johnson from "./Pages/Johnson";
import Asignacion from "./Pages/Asignacion";
import Transporte from "./Pages/Transporte";

function App() {
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
                    <Johnson />
                </Route>
                <Route path="/grafos/asignacion">
                    <Asignacion />
                </Route>
                <Route path="/grafos/Transporte">
                    <Transporte />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
