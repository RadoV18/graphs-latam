import React, { useState, useEffect } from "react";

import Counter from "../Counter/Counter";

import "./AsignacionTable.css";

const AsignacionTable = ({ matrix, setMatrix }) => {
    const [rows, setRows] = useState(3);
    const [columns, setColumns] = useState(3);

    const handleChange = (e, i, j) => {
        setMatrix(matrix.map((elem, row) => 
            row === i ? elem.map((oldValue, col) => col === j ? e.target.value : oldValue ): elem
        ));
    };

    useEffect(() => {
        if(matrix.length < rows) {
            const newRow = [];
            for(let i = 0; i < columns; i++) {
                newRow.push("");
            }
            setMatrix(matrix.concat([newRow]));
        } else if(matrix.length > rows) {
            setMatrix(matrix.slice(0, -1));
        }
    }, [rows]);

    useEffect(() => {
        if(matrix[0].length < columns) {
            setMatrix(matrix.map((elem) => elem.concat("")));
        } else if(matrix[0].length > columns) {
            setMatrix(matrix.map((elem) => elem.slice(0, -1)));
        }
    }, [columns]);

    return (
        <div className="table__container">
            <table className="table">
                <tbody className="table__body">
                    {matrix.map((row, indexI) => (
                        <tr className="table__row" key={"row" + indexI}>
                            {row.map((value, indexJ) => {
                                return <td className="table__col" key={"col" + indexJ}>
                                    <input className="table__input" type="text" onChange={(e) => handleChange(e, indexI, indexJ)} value={value} disabled={indexI === 0 && indexJ === 0 ? true : false} />
                                </td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Counter variable={rows} setVariable={setRows} text="Filas" />
            <Counter variable={columns} setVariable={setColumns} text="Columnas"/>
        </div>
    );
};

export default AsignacionTable;
