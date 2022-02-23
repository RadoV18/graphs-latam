import React from "react";
import "./Header.css";
import logo from "../../img/latam_logo.png";

const Header = () => {
    return (
        <div className="container-header">
            <div className="header-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="title">
                <h2>Diseño de Grafos LATAM Airlines</h2>
            </div>
        </div>
    );
};

export default Header;
