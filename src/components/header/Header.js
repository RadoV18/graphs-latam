import React from 'react';
import './Header.css'; 
import logo from '../../img/latam_logo.png';

const Header = () =>{
    return (
        <div className="container">
            <img src={logo} alt="logo"/>
            <div className="title"> 
                <h2>LATAM Diseño de Gráfos</h2>
            </div>
        </div>
    )

};

export default Header;