import React from "react";
import AnimationNumber from "../AnimationNumber/AnimationNumber";
import "./AnimationContainer.css";

const AnimationContainer = ({ numbers, indexes }) => {
    return (
        <div className="animation__wrapper">
            <div className="animation__container">
                {numbers.map((number, index) => {
                    return (
                        <AnimationNumber
                            value={number}
                            key={index}
                            isHighlighted={indexes.includes(index)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default AnimationContainer;
