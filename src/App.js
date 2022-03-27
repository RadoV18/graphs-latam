import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";
import Main from "./Pages/Main";
import Johnson from "./Pages/Johnson";

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
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
