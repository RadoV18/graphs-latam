import React, { useState, useEffect } from "react";

import Counter from "../Counter/Counter";

import "./TransporteTable.css";

const TransporteTable = ({ matrix, setMatrix, available, setAvailable, demand, setDemand }) => {
    const [rows, setRows] = useState(3);
    const [columns, setColumns] = useState(3);

    const handleChange = (e, i, j) => {
        setMatrix(matrix.map((elem, row) => 
            row === i ? elem.map((oldValue, col) => col === j ? e.target.value : oldValue ): elem
        ));
    };

    const demandChange = (e, i) => {
        e.preventDefault();
        setDemand(demand.map((elem, index) => index === i ? e.target.value : elem));
    }

    const availableChange = (e, i) => {
        e.preventDefault();
        setAvailable(available.map((elem, index) => index === i ? e.target.value : elem));
    }

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

        if(available.length < rows) {
            setAvailable(available.concat(""));
        } else if(available.length > rows) {
            setAvailable(available.slice(0, -1));
        }
    }, [rows]);

    useEffect(() => {
        if(matrix[0].length < columns) {
            setMatrix(matrix.map((elem) => elem.concat("")));
        } else if(matrix[0].length > columns) {
            setMatrix(matrix.map((elem) => elem.slice(0, -1)));
        }

        if(demand.length < columns) {
            setDemand(demand.concat(""));
        } else if(demand.length > columns) {
            setDemand(demand.slice(0, -1));
        }
    }, [columns]);

    return (
        <>
            <div className="table__container">
                <div className="table__container--transporte">
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
                            <tr className="table__demand">
                                {demand.map((value, index) => {
                                    return <td className="table__col" key={"demand" + index} >
                                        <input className={index === 0 ? "table__input available__input" : "table__input" } type="text" value={index === 0 ? "Demanda" : value} onChange={(e) => demandChange(e, index)} disabled={index === 0 ? true : false} />
                                    </td>
                                })}
                            </tr>
                        </tbody>
                    </table>
                    <div className="available__container" style={{marginLeft: "2rem"}}>
                        {available.map((value, index) =>
                            <input className="table__input available__input" type="text" value={index === 0 ? "Disponibilidad" : value} onChange={(e => availableChange(e, index))} disabled={index === 0 ? true : false } />
                        )}
                        <input className="table__input" type="text" disabled />
                    </div>
                </div>
            </div>
            <div className="counter__container">
                <Counter variable={rows} setVariable={setRows} text="Filas" />
                <Counter variable={columns} setVariable={setColumns} text="Columnas"/>
            </div>
        </>
    );
};

export default TransporteTable;
