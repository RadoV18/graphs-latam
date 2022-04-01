function generateMatrixZero(matrix) {
    const zero = [];
    for (let f = 0; f < matrix.length; f++) {
        var row = [];
        for (let c = 0; c < matrix[f].length; c++) {
            row.push(0);
        }
        zero.push(row);
    }
    return zero;
}

function getMatrixDiference(matrix, matrix2) {
    var result = generateMatrixZero(matrix);
    for (let f = 0; f < matrix.length; f++) {
        for (let c = 0; c < matrix[0].length; c++) {
            result[f][c] = matrix[f][c] - matrix2[f][c];
        }
    }
    return result;
}

function getSumaProductoMatrix(matrix, matrix2) {
    var result = 0;
    for (let f = 0; f < matrix.length; f++) {
        for (let c = 0; c < matrix[0].length; c++) {
            result = result + matrix[f][c] * matrix2[f][c];
        }
    }
    return result;
}

function generateMatrixCostosForComplement(matrix, solution) {
    var result = generateMatrixZero(matrix);
    for (let f = 0; f < matrix.length; f++) {
        for (let c = 0; c < matrix[0].length; c++) {
            if (solution[f][c] !== 0) {
                result[f][c] = matrix[f][c];
            }
        }
    }
    return result;
}

function generateArrayZero(num) {
    var newArray = [];
    for (let i = 0; i < num; i++) {
        newArray.push(null);
    }
    return newArray;
}

function generateArraysComplement(matrix) {
    var column = generateArrayZero(matrix[0].length);
    var row = generateArrayZero(matrix.length);
    const min = getMinOfMatrixZero(matrix)[0];
    row[0] = min;
    for (let f = 0; f < matrix.length; f++) {
        for (let c = 0; c < matrix[0].length; c++) {
            if (matrix[f][c] !== 0) {
                if (row[f] != null) {
                    column[c] = matrix[f][c] - row[f];
                } else {
                    if (column[c] != null) {
                        row[f] = matrix[f][c] - column[c];
                    } else {
                        row[f] = matrix[f][c];
                    }
                }
            }
        }
    }
    return [row, column];
}

function generateSolutionComplement(matrix, row, column) {
    var complement = matrix.slice();
    for (let f = 0; f < complement.length; f++) {
        for (let c = 0; c < complement[0].length; c++) {
            if (complement[f][c] === 0) {
                complement[f][c] = row[f] + column[c];
            }
        }
    }
    return complement;
}

function generateMatrixSolution(matrix, demand, avaliable) {
    var demanda = demand.slice();
    var oferta = avaliable.slice();
    var f = 0;
    var c = 0;
    var solution = generateMatrixZero(matrix);
    while ((f < matrix.length) & (c < matrix[0].length)) {
        if (oferta[f] === demanda[c]) {
            solution[f][c] = oferta[f];
            f += 1;
            c += 1;
        } else if (oferta[f] < demanda[c]) {
            solution[f][c] = oferta[f];
            demanda[c] -= solution[f][c];
            f += 1;
        } else {
            solution[f][c] = demanda[c];
            oferta[f] -= solution[f][c];
            c += 1;
        }
    }
    return solution;
}

function getMaxOfMatrix(matrix) {
    var result = matrix[0][0];
    var x = 0,
        y = 0;
    for (let f = 0; f < matrix.length; f++) {
        for (let c = 0; c < matrix[f].length; c++) {
            if (result <= matrix[f][c]) {
                result = matrix[f][c];
                x = f;
                y = c;
            }
        }
    }
    var posicion = [x, y];
    return [result, posicion];
}

function getMinOfMatrix(matrix) {
    var result = matrix[0][0];
    var x = 0,
        y = 0;
    for (let f = 0; f < matrix.length; f++) {
        for (let c = 0; c < matrix[f].length; c++) {
            if (result > matrix[f][c]) {
                result = matrix[f][c];
                x = f;
                y = c;
            }
        }
    }
    var posicion = [x, y];
    return [result, posicion];
}

function getMinOfMatrixZero(matrix) {
    var result = matrix[0][0];
    var x = 0,
        y = 0;
    for (let f = 0; f < matrix.length; f++) {
        for (let c = 0; c < matrix[f].length; c++) {
            if (matrix[f][c] !== 0) {
                if (result > matrix[f][c]) {
                    result = matrix[f][c];
                    x = f;
                    y = c;
                }
            }
        }
    }
    var posicion = [x, y];
    return [result, posicion];
}

//Solution que llego en la ducha
function generateNewSolution(matrix, demand, avaliable, x, y, value) {
    var newSolution = generateMatrixZero(matrix);
    newSolution[x][y] = value;
    var demanda = demand.slice();
    var oferta = avaliable.slice();
    demanda[y] -= value;
    oferta[x] -= value;
    var f = 0;
    var c = 0;
    while ((f < matrix.length) & (c < matrix[0].length)) {
        if (oferta[f] === demanda[c]) {
            newSolution[f][c] = oferta[f];
            f += 1;
            c += 1;
        } else if (oferta[f] < demanda[c]) {
            newSolution[f][c] = oferta[f];
            demanda[c] -= oferta[f];
            f += 1;
        } else {
            newSolution[f][c] = demanda[c];
            oferta[f] -= demanda[c];
            c += 1;
        }
    }
    return newSolution;
}

//obtenemos los valores que se afectan negativamente
function getMinForNewSolution(matrix, demand, avaliable, x, y) {
    //Obtenemos la solution pero con el cambio de uno
    var solutionOne = generateNewSolution(matrix, demand, avaliable, x, y, 1);
    var solution = matrix.slice();
    var afeccted = []; // matriz de los valores afectados negativamente
    for (let f = 0; f < matrix.length; f++) {
        for (let c = 0; c < matrix[f].length; c++) {
            if (solutionOne[f][c] < solution[f][c]) {
                afeccted.push(matrix[f][c]);
            }
        }
    }
    var min = Math.min.apply(null, afeccted);
    return min;
}

function sumValuesMatrix(matrix) {
    var result = 0;
    for (let f = 0; f < matrix.length; f++) {
        for (let c = 0; c < matrix[f].length; c++) {
            if (matrix[f][c] !== 0) {
                result += 1;
            }
        }
    }
    return result;
}

export const northWestAlgorithm = (matrix, avaliable, demand, optim) => {
    var flag = true;
    //Se obtiene la primera solucion
    var solution = generateMatrixSolution(matrix, demand, avaliable);
    //Se ejecutara hasta que el minimo de la matriz diferencia sea 0
    while (flag) {
        const valuesInSolution = solution[0].length + solution.length - 1;
        if (sumValuesMatrix(solution) === valuesInSolution) {
            //Se genera la matriz con los valores de costo en la posicion de la solucion
            const valoresSolucion = generateMatrixCostosForComplement(
                matrix,
                solution
            );
            //Se genera las filas y columnas par poder generar la matriz de complementos
            const [row, column] = generateArraysComplement(valoresSolucion);
            //Se genera la matriz de complementos
            const matrixComplent = generateSolutionComplement(
                valoresSolucion,
                row,
                column
            );
            //Se genera la matriz de la diferencia de la matriz costos con la matriz complementaria
            const matrixDiference = getMatrixDiference(matrix, matrixComplent);
            let op, posicion;
            if (optim) {
                // Si es verdadero es MAXIMIZAR
                [op, posicion] = getMaxOfMatrix(matrixDiference);
            } else {
                [op, posicion] = getMinOfMatrix(matrixDiference);
            }
            if (op === 0) {
                flag = false;
                console.log("El resultado es optimo");
            } else {
                //Se tendria que verificar si el minimo es mayor que cero ahi seria un error fatal
                //Se obtiene la posicion del valor minimo del array
                const realValue = getMinForNewSolution(
                    solution,
                    demand,
                    avaliable,
                    posicion[0],
                    posicion[1]
                );
                const newSolution = generateNewSolution(
                    solution,
                    demand,
                    avaliable,
                    posicion[0],
                    posicion[1],
                    realValue
                );
                solution = newSolution.slice();
            }
        } else {
            flag = false;
        }
    }
    console.log("Resultado MAXIMO");
    console.log(getSumaProductoMatrix(matrix, solution));
    return solution;
};
