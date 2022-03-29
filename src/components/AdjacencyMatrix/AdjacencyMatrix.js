import React from "react";
import { useSelector } from "react-redux";
import './AdjacencyMatrix.css';

const AdjacencyMatrix = () => {
    const adjacencyMatrix = useSelector((state) => state.adjacencyMatrix);
    
    const rowsSum = [];
    adjacencyMatrix.matrix.forEach((row) => {
        let rowSum = 0;
        row.forEach((weight) => {
            rowSum += (weight === -1 ? 0 : weight);
        });
        rowsSum.push(rowSum);
    });

    const columnsSum = [];
    for(let i = 0; i < adjacencyMatrix.matrix.length; i++) {
        let columnSum = 0;
        for(let j = 0; j < adjacencyMatrix.matrix.length; j++) {
            const weight = adjacencyMatrix.matrix[j][i];
            columnSum += (weight === -1 ? 0 : weight);
        }
        columnsSum.push(columnSum);
    }

    return (
        <div className="adjacency-matrix">
            <h2>Matriz de Adyacencia</h2>
            <table>
                <tbody>
                    <tr>
                        <td key="empty" className="cell-node"></td>
                        {adjacencyMatrix.labels.map((label, index) => 
                            <td key={`cn-${index}`} className="cell-node">{label[0]}</td>    
                        )}
                        <td key="sum-0" className="cell-node">
                            <span>Suma</span>
                        </td>
                    </tr>
                    {adjacencyMatrix.matrix.map((row, index) => 
                        <tr key={`nrow-${index}`}>
                            <td key={`srow-${index}`} className="cell-node">{adjacencyMatrix.labels[index][0]}</td>
                            {row.map((element, index) =>
                                <td key={`row-${index}`} className="cell-value">{element === -1 ? 0 : element}</td>
                            )}
                            <td key={`sum-r-${index}`} className="cell-addition">{rowsSum[index]}</td>
                        </tr>    
                    )}
                    <tr>
                        <td key="sum-1" className="cell-node">
                            <span>Suma</span>
                        </td>
                        {columnsSum.map((sum, index) => 
                            <td key={`colsum-${index}`} className="cell-addition">{sum}</td>    
                        )}
                        <td key="empty-1"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AdjacencyMatrix;
