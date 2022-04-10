import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '../Button/Button';
import './Footer.css';

const Footer = ({ btnText, onClick, dir }) => {
    const history = useHistory();

    const redirectToContactUs = () => {
        history.push("/contacto");
    }

    const openManual = () => {
        console.log("HOLA");
        const newWindow = window.open(`${dir}`, "_blank", "noopener,noreferrer");
        if(newWindow) {
            newWindow.opener = null;
        }
    }

    return (
        <div>
            <div className="footer">
                <div className="button-container">
                    <Button text="Manual de Usuario" onClick={openManual}/>
                    <Button text={btnText} onClick={onClick}/>
                    <Button text="Contáctanos" onClick={redirectToContactUs}/>
                </div>
            </div>
        </div>
        );
};

export default Footer;