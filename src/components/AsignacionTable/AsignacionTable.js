import React, { useState, useEffect, useRef } from "react";

import Counter from "../Counter/Counter";
import Button from "../Button/Button";

import "./AsignacionTable.css";

const AsignacionTable = ({ matrix, setMatrix }) => {
    const [rows, setRows] = useState(3);
    const [columns, setColumns] = useState(3);

    const inputRef = useRef(null);

    const handleChange = (e, i, j) => {
        setMatrix(
            matrix.map((elem, row) =>
                row === i
                    ? elem.map((oldValue, col) =>
                          col === j ? e.target.value : oldValue
                      )
                    : elem
            )
        );
    };

    useEffect(() => {
        if (matrix.length < rows) {
            const newRow = [];
            for (let i = 0; i < columns; i++) {
                newRow.push("");
            }
            setMatrix(matrix.concat([newRow]));
        } else if (matrix.length > rows) {
            setMatrix(matrix.slice(0, -1));
        }
    }, [rows]);

    useEffect(() => {
        if (matrix[0].length < columns) {
            setMatrix(matrix.map((elem) => elem.concat("")));
        } else if (matrix[0].length > columns) {
            setMatrix(matrix.map((elem) => elem.slice(0, -1)));
        }
    }, [columns]);

    const importFromJSON = () => {
        inputRef.current.click();
    };

    const fileChange = (e) => {
        if(e.target.files) {
            const fr = new FileReader();
            fr.onload = () => {
                const importedData = JSON.parse(fr.result);
                setMatrix(importedData.matrix);
                setRows(importedData.rows);
                setColumns(importedData.columns);
            }
            fr.readAsText(e.target.files[0]);
        }
    }

    const exportFile = () => {
        const data = JSON.stringify({
            matrix,
            rows,
            columns
        });
        const filename = "data.json";
        const fileType = "text/json";

        const blob = new Blob([data], { type: fileType });
        const a = document.createElement("a");
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        const clickEvt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        a.dispatchEvent(clickEvt);
        a.remove();
    };

    return (
        <>
            <div className="table__container">
                <table className="table">
                    <tbody className="table__body">
                        {matrix.map((row, indexI) => (
                            <tr className="table__row" key={"row" + indexI}>
                                {row.map((value, indexJ) => {
                                    return (
                                        <td
                                            className="table__col"
                                            key={"col" + indexJ}
                                        >
                                            <input
                                                className="table__input"
                                                type="text"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        indexI,
                                                        indexJ
                                                    )
                                                }
                                                value={value}
                                                disabled={
                                                    indexI === 0 && indexJ === 0
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="counter__container">
                <Counter variable={rows} setVariable={setRows} text="Filas" />
                <Counter
                    variable={columns}
                    setVariable={setColumns}
                    text="Columnas"
                />
                <Button onClick={exportFile} text="Exportar" />
                <button onClick={importFromJSON}>
                    Importar
                    <input
                        ref={inputRef}
                        type="file"
                        name="file"
                        className="input--hidden"
                        onChange={fileChange}
                        accept="text/json"
                    />
                </button>
            </div>
        </>
    );
};

export default AsignacionTable;
