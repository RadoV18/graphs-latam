import React from "react";
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
                    <img src={logo} alt="logo" />
                </div>
                <div className="title">
                    <h2>{title}</h2>
                </div>
            </div>
        );
    }
    

};

export default Header;
