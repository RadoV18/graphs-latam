import React from "react";
import { useSelector } from "react-redux";
import './AdjacencyMatrix.css';

const AdjacencyMatrix = () => {
    const adjacencyMatrix = useSelector((state) => state.adjacencyMatrix);
    
    const rowsSum = [];
    adjacencyMatrix.matrix.forEach((row) => {
        let rowSum = 0;
        row.forEach((weight) => {
            rowSum += weight;
        });
        rowsSum.push(rowSum);
    });

    const columnsSum = [];
    for(let i = 0; i < adjacencyMatrix.matrix.length; i++) {
        let columnSum = 0;
        for(let j = 0; j < adjacencyMatrix.matrix.length; j++) {
            columnSum += adjacencyMatrix.matrix[j][i];
        }
        columnsSum.push(columnSum);
    }

    return (
        <div className="adjacency-matrix">
            <h2>Matriz de Adyacencia</h2>
            <table>
                <tbody>
                    <tr>
                        <td className="cell-node"></td>
                        {adjacencyMatrix.labels.map((label) => 
                            <td className="cell-node">{label[0]}</td>    
                        )}
                        <td className="cell-node">
                            <span>Suma</span>
                        </td>
                    </tr>
                    {adjacencyMatrix.matrix.map((row, index) => 
                        <tr>
                            <td className="cell-node">{adjacencyMatrix.labels[index][0]}</td>
                            {row.map((element) =>
                                <td className="cell-value">{element}</td>
                            )}
                            <td className="cell-addition">{rowsSum[index]}</td>
                        </tr>    
                    )}
                    <tr>
                        <td className="cell-node">
                            <span>Suma</span>
                        </td>
                        {columnsSum.map((sum) => 
                            <td className="cell-addition">{sum}</td>    
                        )}
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AdjacencyMatrix;
