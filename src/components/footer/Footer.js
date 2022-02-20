import React from 'react';
import Button from '../button/Button';
import './Footer.css';

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="button-container">
                    <Button text="Salir de la aplicación"/>
                    <Button text="Generar Matriz de Adyacencia"/>
                    <Button text="Contáctanos"/>
                </div>

            </div>
        </>
        );
};
export default Footer;