import React from "react";

const TextInput = ({ value, changeHandler, name, id}) => {
    return (
        <div>
            <input
                autoFocus
                value={value}
                onChange={changeHandler}
                type="text"
                name={name}
                id={id}
            />
        </div>
    );
};

export default TextInput;
