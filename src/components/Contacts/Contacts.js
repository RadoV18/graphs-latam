import React from "react";
import "./Contacts.css";

import People from "../People/People";

const Contacts = () => {
    return (
        <div className="container-contacts">
            <div className="box">
                <People
                    img="/img/Members/Radomir.jpg"
                    name="Radomir Luis Vladislavic Nolasco"
                    uni={'Universidad Católica Boliviana "San Pablo"'}
                />
                <People
                    img="/img/Members/Sebastian.png"
                    name="Sebastian Francisco Belmonte Cerveró"
                    uni={'"Universidad Católica Boliviana "San Pablo"'}
                />
                <People
                    img="/img/Members/Ignacio.png"
                    name="Ignacio André Agramont Bejarano"
                    uni={'Universidad Católica Boliviana "San Pablo"'}
                />
                <People
                    img="/img/Members/Emerson.png"
                    name="Emerson Daniel Chipana Luna"
                    uni={'Universidad Católica Boliviana "San Pablo"'}
                />
                <People
                    img="/img/Members/Alan.png"
                    name="Alan Wiler Zarate Chino"
                    uni={'Universidad Católica Boliviana "San Pablo"'}
                />
            </div>
        </div>
    );
};

export default Contacts;
