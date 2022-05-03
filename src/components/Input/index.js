import React from 'react';
import "./input.css";

const Input = ( {text, onChange} ) => {
  return (
    <div className="container__input">
        <label htmlFor="input" className="--bold">{text}</label>
        <input type="text" placeholder={text} onChange={onChange} className="__input"/>
    </div>
  )
}

export default Input