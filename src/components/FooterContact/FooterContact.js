import React from "react";
import "./FooterContact.css";
import { useHistory } from "react-router-dom";
import Button from "../Button/Button";

const FooterContact = () => {
    const history = useHistory();

    const onClick = () => {
        history.push("/");
    };

    return (
        <div className="footer">
            <Button onClick={onClick} text={"Volver a inicio"} />
        </div>
    );
};

export default FooterContact;
