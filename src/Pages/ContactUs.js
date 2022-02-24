import React from "react";
import FooterContact from "../components/FooterContact/FooterContact";
import Contacts from "../components/Contacts/Contacts";
import Header from "../components/Header/Header";

const ContactUs = () => {
    return (
        <div className="container">
            <Header />
            <Contacts />
            <FooterContact />
        </div>
    );
};

export default ContactUs;
