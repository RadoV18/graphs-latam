import React from "react";
import "./Contacts.css";
import Radomir from "../../img/Members/Radomir.jpg";
import Sebastian from "../../img/Members/Sebastian.png";
import Ignacio from "../../img/Members/Ignacio.png";
import Emerson from "../../img/Members/Emerson.png";
import Alan from "../../img/Members/Alan.png";

import People from "../People/People";

const Contacts = () => {
    return (
        <div className="container-contacts">
            <div className="box">
                <People
                    img={Radomir}
                    name={"Radomir Luis Vladislavic Nolasco"}
                    uni={"Universidad Católica Bolivia San Pablo"}
                />
                <People
                    img={Sebastian}
                    name={"Sebastian Francisco Belmonte Cerveró"}
                    uni={"Universidad Católica Bolivia San Pablo"}
                />
                <People
                    img={Ignacio}
                    name={"Ignacio Andre Agramont Bejarano"}
                    uni={"Universidad Católica Bolivia San Pablo"}
                />
                <People
                    img={Emerson}
                    name={"Emerson Daniel Chipana Luna"}
                    uni={"Universidad Católica Bolivia San Pablo"}
                />
                <People
                    img={Alan}
                    name={"Alan Wiler Zaratet Chino"}
                    uni={"Universidad Católica Bolivia San Pablo"}
                />
            </div>
        </div>
    );
};

export default Contacts;
