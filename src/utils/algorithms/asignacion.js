export const asignacionAlgorithm = (matrix, maximaze) => {
    // si el objetivo es maximizar: maximaze = true;
    // por el contrario si es minimizar: maximaze = false;

    // var copyMatrix = matrix.map(function (arr) {
    //     return arr.slice();
    // });

    // console.log(copyMatrix[0][0]);
    // console.log(typeof(copyMatrix[0][0]));

    var copyMatrix = [];
    for(let i = 0 ; i < matrix.length ; i++){
        let aux = [];
        for(let j = 0; j< matrix[0].length ;j++){
            aux.push(parseInt(matrix[i][j]));
        }
        copyMatrix.push(aux);
    }
     
    
    var verdaderasSoluciones = [];                  
    var prevSolutionArray = [];

    mainFunctionforMatrix( copyMatrix, 
        maximaze, 
        verdaderasSoluciones, 
        prevSolutionArray, 
        10);
   
    

    var variable1  = getPathInArrayPosition(verdaderasSoluciones, copyMatrix);
    console.log(variable1); 
    // doble filtro
    /*
    var variable2 = [];
     getOrderedOfPath(variable1, variable2, matrix, maximaze);
     console.log('Second ');
     console.log(variable2);
*/
     // end doble filtro
    return variable1;
};

function getOrderedOfPath(path, stored, matrix, maximaze){
    var valueCurrent = multiplicaPor(path[0], matrix );
    for(let i = 0; i < path.length ; i++){
        var aux = multiplicaPor(path[i], matrix);
        if(maximaze){
            
            if(valueCurrent < aux){
                valueCurrent = aux;
            }
        }else{
            if(aux < valueCurrent){
                valueCurrent = aux;
            }

        }
    }

    for(let i = 0; i < path.length ; i++){
        if(multiplicaPor(path[i], matrix) === valueCurrent){
             
            stored.push(path[i]);
        }
    }

    
}

function multiplicaPor(path, matrix){
    var val = 0;
    for(let i = 0 ; i < path.length ; i++){
        val = val +  ( parseInt(matrix[ path[i][0] ][ path[i][1] ]));
        
    }
    return val;
}

function mainFunctionforMatrix(copyMatrix, maximaze, trueSolutions, prevSolutionArray, a){
    
    //if(prevSolutionArray.length === copyMatrix[0].length){
    if(a === 0 || prevSolutionArray.length === copyMatrix[0].length ){ 
       
        trueSolutions.push(prevSolutionArray);
 
    }else{
 
        operateByColumns(copyMatrix, maximaze);
        operateByRows(copyMatrix, maximaze); 
        
        var zerosArray = giveMeZerosArray(copyMatrix); 
 
        var pathsFounded = givePathFounded(zerosArray); 

        var pathInArray = getPathInArrayPosition(pathsFounded, copyMatrix); 

        for(let i=0; i < pathInArray.length ; i++){
            var copy2matrix = copyMatrix.map(function(arr) {
                return arr.slice();
            });
            var copyArray = pathInArray[i].map(function(arr) {
                return arr.slice();
            });
            if(pathInArray[i].length < copyMatrix[0].length){
 
                usarPivote(copy2matrix, copyArray, maximaze);
 
            } 
            mainFunctionforMatrix(copy2matrix, maximaze, trueSolutions, copyArray , a-1);

        }
    }

     
     
}

// function operateInMatrix(copyMatrix, maximaze, trueSoutions, matrixSolutions) {
//     if (maximaze) {
//         maximizarFunction(copyMatrix, maximaze, trueSoutions, matrixSolutions);
//     } else {
//         minimizarFunction(copyMatrix, maximaze, trueSoutions, matrixSolutions);
//     }
// }

// function maximizarFunction(
//     copyMatrix,
//     maximaze,
//     trueSoutions,
//     matrixSolutions
// ) {
    
//     let numAuxiliar = 0;
//     while (numAuxiliar != copyMatrix[0].length) {
//         operateByColumns(copyMatrix, maximaze);

//         operateByRows(copyMatrix, maximaze);

//         var zerosArray = giveMeZerosArray(copyMatrix);

//         var pathsFounded = givePathFounded(zerosArray);

//         var pathInArray = getPathInArrayPosition(pathsFounded, copyMatrix);

//         for (let i = 0; i < pathInArray.length; i++) {
//             if (pathInArray[i].length === copyMatrix[0].length) {
//                 numAuxiliar = pathInArray[i].length;
//                 matrixSolutions.push(copyMatrix);
//                 trueSoutions.push(pathInArray);
//             } else {
//                 var copy2matrix = copyMatrix.map(function (arr) {
//                     return arr.slice();
//                 });
//                 var copyArray = pathInArray[i].map(function (arr) {
//                     return arr.slice();
//                 });

//                 usarPivote(copy2matrix, copyArray, maximaze);

//                 operateInMatrix(
//                     copy2matrix,
//                     maximaze,
//                     trueSoutions,
//                     matrixSolutions
//                 );
//             }
//         }
//     }
// }

// function minimizarFunction(
//     copyMatrix,
//     maximaze,
//     trueSoutions,
//     matrixSolutions
// ) {
    
//     let numAuxiliar = 0;
//     while(numAuxiliar != copyMatrix[0].length){ 
//         operateByColumns(copyMatrix, maximaze);

//         operateByRows(copyMatrix, maximaze);

//         var zerosArray = giveMeZerosArray(copyMatrix);

//         var pathsFounded = givePathFounded(zerosArray);

//         var pathInArray = getPathInArrayPosition(pathsFounded, copyMatrix);

//         for (let i = 0; i < pathInArray.length; i++) {
//             if (pathInArray[i].length === copyMatrix[0].length) {
//                 matrixSolutions.push(copyMatrix);
//                 trueSoutions.push(pathInArray);
//             } else {
//                 var copy2matrix = copyMatrix.map(function (arr) {
//                     return arr.slice();
//                 });
//                 var copyArray = pathInArray[i].map(function (arr) {
//                     return arr.slice();
//                 });

//                 usarPivote(copy2matrix, copyArray, maximaze);

//                 operateInMatrix(
//                     copy2matrix,
//                     maximaze,
//                     trueSoutions,
//                     matrixSolutions
//                 );
//             }
//         }
//     }
// }
function usarPivote(matrixSelected, pathSelected, maximaze) {
    let elementsInRow = giveSeparateElements(pathSelected, true);
    let elementsInColumn = giveSeparateElements(pathSelected, false);

    var results = [];
    for (let i = 0; i < matrixSelected.length; i++) {
        if (!elementsInRow.includes(i)) {
            for (let j = 0; j < matrixSelected[i].length; j++) {
                if (!elementsInColumn.includes(j)) {
                    results.push(matrixSelected[i][j]);
                }
            }
        }
    }

    if (results.length > 0) {
        results.sort(function(a,b){
            return a-b;
        });
        var num = results[0];
        if (maximaze) {
            num = results[results.length - 1];
        }
        operateWithPivote(matrixSelected, elementsInColumn, elementsInRow, num);
    }
}

function operateWithPivote(
    matrixSelected,
    elementsInColumn,
    elementsInRow,
    num
) {
    for (let i = 0; i < matrixSelected.length; i++) {
        for (let j = 0; j < matrixSelected[i].length; j++) {
            if (elementsInRow.includes(i) === elementsInColumn.includes(j)) {
                if (elementsInRow.includes(i)) {
                    matrixSelected[i][j] += num;
                } else {
                    matrixSelected[i][j] -= num;
                }
            }
        }
    }
}

function giveSeparateElements(path, row) {
    let rows = [];
    let cols = [];
    for (let i = 0; i < path.length; i++) {
        rows.push(path[i][0]);
        cols.push(path[i][1]);
    }

    if (row) {
        return rows;
    } else {
        return cols;
    }
}

function operateByColumns(copyMatrix, maximaze) {
    for (let col = 0; col < copyMatrix[0].length; col++) {
        let currentNum = copyMatrix[0][col];
        for (let row = 0; row < copyMatrix.length; row++) {
            if (maximaze) {
                if (copyMatrix[row][col] > currentNum) {
                    currentNum = copyMatrix[row][col];
                }
            } else {
                if (copyMatrix[row][col] < currentNum) {
                    currentNum = copyMatrix[row][col];
                }
            }
        }

        for (let row2 = 0; row2 < copyMatrix.length; row2++) {
            copyMatrix[row2][col] -= currentNum;
        }
    }
}

function operateByRows(copyMatrix, maximaze) {
    for (let row = 0; row < copyMatrix.length; row++) {
        let currentNum = copyMatrix[row][0];
        for (let col = 0; col < copyMatrix[0].length; col++) {
            if (maximaze) {
                if (copyMatrix[row][col] > currentNum) {
                    currentNum = copyMatrix[row][col];
                }
            } else {
                if (copyMatrix[row][col] < currentNum) {
                    currentNum = copyMatrix[row][col];
                }
            }
        }

        for (let col2 = 0; col2 < copyMatrix[0].length; col2++) {
            copyMatrix[row][col2] -= currentNum;
        }
    }
}

function giveMeZerosArray(copyMatrix) {
    const zeros = [];
    for (let row = 0; row < copyMatrix.length; row++) {
        for (let col = 0; col < copyMatrix[0].length; col++) {
            if (copyMatrix[row][col] === 0) {
                zeros.push([row, col]);
            }
        }
    }
    return zeros;
}
// adding coordenadas de los ceros

// aray con las posiciones de ceros

function givePathFounded(zerosArray) {
    const pathCorrec = [];
    for (let i = 0; i < zerosArray.length; i++) {
        var currentPath = [];
        currentPath.push(zerosArray[i]);
        realizaIteraciones(currentPath, pathCorrec, zerosArray);
    }
    return pathCorrec;
}

function getPathInArrayPosition(pathsFounded, copyMatrix) {
    const pathInArrayByPosition = [];
    for (let i = 0; i < pathsFounded.length; i++) {
        var current = pathsFounded[i];
        var aux2 = [];
        for (let b = 0; b < current.length; b++) {
            aux2.push(current[b][0] * copyMatrix.length + current[b][1]);
        }
        pathInArrayByPosition.push(aux2);
    }

    for (let i = 0; i < pathInArrayByPosition.length; i++) {
        pathInArrayByPosition[i].sort(function(a,b){
            return a-b;
        });
    }

    const deletedRepeated = uniqBy(pathInArrayByPosition, JSON.stringify);

    const posibleSolutions = [];

    for (let i = 0; i < deletedRepeated.length; i++) {
        var posible = [];
        var currentPos = deletedRepeated[i];
        for (let a = 0; a < currentPos.length; a++) {
            posible.push([
                parseInt(currentPos[a] / copyMatrix.length),
                currentPos[a] % copyMatrix[0].length,
            ]);
        }
        posibleSolutions.push(posible);
    }

    const highEst = takeTheHightPosible(posibleSolutions);

    const truePosibles = getPosibleSolutions(highEst, posibleSolutions);

    return truePosibles;
}

// se encuentas las mas altas posibles soluciones

function getPosibleSolutions(highest, posibleSolutions) {
    var truepos = [];
    for (let i = 0; i < posibleSolutions.length; i++) {
        if (posibleSolutions[i].length === highest) {
            truepos.push(posibleSolutions[i]);
        }
    }
    return truepos;
}
function takeTheHightPosible(posibleSolutions) {
    var high = 0;
    for (let i = 0; i < posibleSolutions.length; i++) {
        if (posibleSolutions[i].length > high) {
            high = posibleSolutions[i].length;
        }
    }
    return high;
}

function uniqBy(a, key) {
    var seen = {};
    return a.filter(function (item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
}

function realizaIteraciones(currentPath, pathsFounded, zerosArray) {
    for (let i = 0; i < zerosArray.length; i++) {
        if (!isRowOrColumnHere(currentPath, zerosArray[i])) {
            var auxiliar = currentPath.map(function (arr) {
                return arr.slice();
            });
            auxiliar.push(zerosArray[i]);

            realizaIteraciones(auxiliar, pathsFounded, zerosArray);
            pathsFounded.push(auxiliar);
        }
    }
}

function isRowOrColumnHere(array, num) {
    var res = false;
    for (let i = 0; i < array.length; i++) {
        if (array[i][0] === num[0]) {
            res = true;
            break;
        }

        if (array[i][1] === num[1]) {
            res = true;
            break;
        }
    }

    return res;
}
