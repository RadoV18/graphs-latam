import React from 'react';
import "./card.css";
import Button from "../Button/Button";

const Card = ({subtitle, img, text, buttonText, onClick}) => {
  return (
    <div className="card-content">
        <h3>{subtitle}</h3>
        <img src={img} alt={subtitle} />
        <div className="card-text">
          {text}
        </div>
        <div className="card__button"><Button text={buttonText} onClick={onClick} /></div>
    </div>
  )
}

export default Card
