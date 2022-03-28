import React from "react";
import FooterContact from "../components/FooterContact/FooterContact";
import Contacts from "../components/Contacts/Contacts";
import Header from "../components/Header/Header";

const ContactUs = () => {
    return (
        <div className="container">
            <Header title="Diseño de Grafos LATAM Airlines" logo="/img/latam_logo.png"/>
            <Contacts />
            <FooterContact />
        </div>
    );
};

export default ContactUs;
