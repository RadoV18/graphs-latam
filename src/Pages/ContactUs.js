import React from "react";
import Header from "../components/Header/Header";
import FooterContact from "../components/FooterContact/FooterContact";
import Contacts from "../components/Contacts/Contacts";

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
