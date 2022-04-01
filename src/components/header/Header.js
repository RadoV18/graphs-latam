import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({title, logo}) => {
    if(logo === ""){
        return (
            <div className="container-header">
                <div className="header-logo">
                </div>
                <div className="title">
                    <h2>{title}</h2>
                </div>
            </div>
        );
    }
    else{
        return (
            <div className="container-header">
                <div className="header-logo">
                    <Link to="/" ><img src={logo} alt="logo" /></Link>
                </div>
                <div className="title">
                    <h2>{title}</h2>
                </div>
            </div>
        );
    }
    

};

export default Header;
