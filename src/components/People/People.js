import React from "react";
import "./People.css";

const People = (props) => {
    return (
        <div className="person">
            <div className="image">
                <img src={props.img} alt="Persona"></img>
            </div>
            <div className="description">
                <article>
                    <h3>{props.name}</h3>
                    <span>{props.uni}</span>
                </article>
            </div>
        </div>
    );
};

export default People;
