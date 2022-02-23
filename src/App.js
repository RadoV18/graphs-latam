import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main";
import ContactUs from "./Pages/ContactUs";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/contacto">
                    <ContactUs />
                </Route>
                <Route path="/">
                    <Main />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
