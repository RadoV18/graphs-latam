import React from "react";

const Counter = ({ variable, setVariable, text }) => {
    const increase = () => {
        setVariable(variable => variable + 1);
    };

    const decrease = () => {
        setVariable(variable => variable === 1 ? 1 : variable - 1);
    };

    return (
        <div className="counter">
            <span>{text}</span>
            <button onClick={decrease}>-</button>
            <span>{Number(variable) - 1}</span>
            <button onClick={increase}>+</button>
        </div>
    );
};

export default Counter;
