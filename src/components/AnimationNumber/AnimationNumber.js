import React from "react";
import "./AnimationNumber.css";

const AnimationNumber = ({ value, isHighlighted }) => {
    return (
        <div className={isHighlighted
            ? "animation-number__wrapper animation-number__wrapper--highlighted"
            : "animation-number__wrapper"}
        >
            <div className="animation-number__container">
                <span className="animation-number__value">{value}</span>
            </div>
        </div>
    );
};

export default AnimationNumber;
