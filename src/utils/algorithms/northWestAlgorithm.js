
export const northWestAlgorithm = (matrixCostos,  vectorVertical, vectorHorizontal, maximaze) =>{
    matrixCostos = convertMatrixInNumbers(matrixCostos).slice();
    console.log("Matrix Convertida");
    console.log(matrixCostos);
    console.log(vectorHorizontal);
    console.log(vectorVertical);

    var verdaderaSolucion = mainFunctionForTransport(verdaderaSolucion,  matrixCostos, vectorHorizontal, vectorVertical, maximaze);
    

    return verdaderaSolucion;

    // var currentSolution = [];
    // refillWithZeros(currentSolution, matrixCostos.length, matrixCostos[0].length);
    // for(let row = 0 ; row < matrixCostos.length ; row++){
    //     for(let col = 0 ; col < matrixCostos[row].length ; col++){
    //         var onRows = vectorVertical[row] - findSumArray(currentSolution[row]);
    //         var onCols = vectorHorizontal[col] - findSumCol(currentSolution, col);
    //         if(onRows < onCols){
    //             currentSolution[row][col] = onRows;
    //         }else{             
    //             currentSolution[row][col] = onCols;
    //         }
    //     }
    // }
    // var matrixSolutions = [];
    // recursiveMainFunction(currentSolution, matrixCostos,  vectorHorizontal, vectorVertical, maximaze, matrixSolutions);
    // var trulyTrueSolutions = [];
    // if(matrixSolutions.length === 0){
    //     for(let i=0; i < currentSolution.length ; i++){
    //         trulyTrueSolutions.push(currentSolution[i]);
    //     }
    // }else{
    //     trulyTrueSolutions = checkForTrulySolutions(matrixCostos, matrixSolutions,   maximaze);
    // }
    // console.log('true solution');
    // console.log(trulyTrueSolutions);
    // return trulyTrueSolutions;
}



function convertMatrixInNumbers(matrix){
    var copyMatrix = [];
    for(let i = 0 ; i < matrix.length ; i++){
        let aux = [];
        for(let j = 0; j< matrix[0].length ;j++){
            aux.push(parseInt(matrix[i][j]));
        }
        copyMatrix.push(aux);
    }
    return copyMatrix;
}


function mainFunctionForTransport(solucionReal,  matrixCostos, vectorHorizontal, vectorVertical, maximaze){
    var currentSolution = [];

    refillWithZeros(currentSolution, matrixCostos.length, matrixCostos[0].length);
    
   
    console.log(currentSolution);

    
    for(let row = 0 ; row < matrixCostos.length ; row++){
        
        for(let col = 0 ; col < matrixCostos[row].length ; col++){
            var onRows = vectorVertical[row] - findSumArray(currentSolution[row]);
            var onCols = vectorHorizontal[col] - findSumCol(currentSolution, col);
             
            if(onRows < onCols){
                
                currentSolution[row][col] = onRows;
            }else{
               
                currentSolution[row][col] = onCols;
            }

             
        }
    }

    var matrixSolutions = [];
    recursiveMainFunction(currentSolution, matrixCostos,  vectorHorizontal, vectorVertical, maximaze, matrixSolutions);
    
    
    console.log('FINAL');
    console.log(matrixSolutions);
    var trulyTrueSolutions = [];
    if(matrixSolutions.length === 0){
        for(let i=0; i < currentSolution.length ; i++){
            trulyTrueSolutions.push(currentSolution[i]);
        }
    }else{
        trulyTrueSolutions = checkForTrulySolutions(matrixCostos, matrixSolutions,   maximaze);
    }
    
    console.log('true solution');
    console.log(trulyTrueSolutions);
    console.log(calculateAllDataMatrix(matrixCostos, trulyTrueSolutions));
    return trulyTrueSolutions;
  
 
}

function checkForTrulySolutions(costos, matrixSolutions,   maximize){
    var checkPoint = 0;
    var num = calculateAllDataMatrix(costos, matrixSolutions[checkPoint]);
    

    for(let current = 0; current < matrixSolutions.length; current++){
        var sumatoria = calculateAllDataMatrix(costos, matrixSolutions[current]);

        if(maximize){
            if(sumatoria > num){
                num = sumatoria;
                checkPoint = current;
            }
        }else{
            if(sumatoria < num){
                num = sumatoria;
                checkPoint = current;
            }
        } 
    }

    return matrixSolutions[checkPoint];
}
function calculateAllDataMatrix(costos, matrix){
    var num = 0;

    for(let i = 0; i < costos.length; i++){
        for(let j=0; j < costos[i].length; j++){
            // nueva edicion
            if(matrix[i][j] >=0){
                num = num +  ( costos[i][j] * matrix[i][j] );
            }

            // fin nueva edicion 
            //num = num +  ( costos[i][j] * matrix[i][j] ); 
        }
    }
    return num;
}

function recursiveMainFunction(currentSolution, matrixCostos, vectorHorizontal, vectorVertical, maximaze, matrixSolutions){
    var selectValuesFromCostosBasedOnCurrent = [];
    var secondVectorVertical = [];
    var secondVectorHorizontal = [];

    var newSeletedValues = [];

    
    

    insertIntoMatrix(currentSolution, matrixCostos, newSeletedValues);
    console.log('current solution and new Selected values and matrixCostos');
    console.log(currentSolution, newSeletedValues, matrixCostos);

    
    refillVectors(secondVectorVertical,  currentSolution.length, true, newSeletedValues);
    refillVectors(secondVectorHorizontal, currentSolution[0].length, false, newSeletedValues);

    asummepositionFrOriginalMatrix( currentSolution, newSeletedValues, matrixCostos, secondVectorVertical, secondVectorHorizontal);

    console.log('currentSolution');
    console.log(currentSolution);
    console.log('new SelectedValues');
    console.log(newSeletedValues); 
    console.log('MatrixCostos');
    console.log(matrixCostos);

    console.log('momenot dos de la iteracion');
    console.log(secondVectorHorizontal);
    console.log(secondVectorVertical);

    // ya se han encontrado nlos valores que son para las columnas y los verticvews 

    var refillValuesWithSides =[];

    refillMatricWithVectors(refillValuesWithSides, secondVectorVertical, secondVectorHorizontal);

    console.log('fourth amtrix');
    console.log(refillValuesWithSides);

    var originalMinusRefilled = [];

    restarMatrices(originalMinusRefilled, matrixCostos, refillValuesWithSides);

    console.log('originalMinusRefilled');
    
    console.log(originalMinusRefilled);

    var posLookeFor    = [];
     
    getMaxOrMin( posLookeFor, originalMinusRefilled, maximaze);

    if(originalMinusRefilled[posLookeFor[0]][posLookeFor[1]] != 0){
        console.log('posLokedFor');
        console.log(posLookeFor);
        console.log(originalMinusRefilled[posLookeFor[0]][posLookeFor[1]]);

        var allPositionToIterate = [];
        getAllPOsitionsForInstance(currentSolution, allPositionToIterate, posLookeFor);

        console.log('positions to iterate');
        console.log(allPositionToIterate);
        
        var posiblePaths = [];
        var posibility = [];
        var positionsVisited = [];
        positionsVisited.push(transformIntoIndexOfArray(originalMinusRefilled[0].length, posLookeFor[0], posLookeFor[1]))
        getAllPosiblePaths(positionsVisited,  currentSolution, posLookeFor, allPositionToIterate, posibility, true);
        
        getAllPosiblePaths(positionsVisited, currentSolution, posLookeFor, allPositionToIterate, posibility, false);

        console.log('posibility');
        console.log(posibility);
        
        

        
        

        var arrayForPositionsSolution = [];
        for(let i = 0 ; i < posibility.length ; i++){
            var auxl = [];
            transformArrayIndexIntoMatrixPosition(posibility[i], auxl, originalMinusRefilled[0].length);       
            arrayForPositionsSolution.push(auxl);
        }
        
        

        console.log('position solutions');
        console.log(arrayForPositionsSolution); 

        var posibleRes = [];
        hasAllPairs(posibleRes , arrayForPositionsSolution);

        console.log('Check for posible Res ');
        console.log(posibleRes);

        var newCurrentSolutionminusX  = currentSolution.map(function(arr) {
            return arr.slice();
        });;
        for(let i = 0 ; i < posibleRes.length ; i++ ){
            if(posibleRes[i]){
                console.log("new current solution minus x");
                console.log(newCurrentSolutionminusX);

                console.log("current solution")
                console.log(currentSolution);

                console.log("A la matriz que se debe encontrar el puto menor")
                console.log(refillValuesWithSides);

                console.log('array for position solutions ');
                console.log(arrayForPositionsSolution[i]);


                createNewMatrixWithSelectedPath(newCurrentSolutionminusX, currentSolution,  arrayForPositionsSolution[i], maximaze);
                console.log('New Matrix');
                console.log(newCurrentSolutionminusX);
                matrixSolutions.push(newCurrentSolutionminusX);
                //recursiveMainFunction(newCurrentSolutionminusX, vectorHorizontal, vectorVertical, maximaze, matrixSolutions);
                
                recursiveMainFunction(newCurrentSolutionminusX, matrixCostos, vectorHorizontal, vectorVertical, maximaze, matrixSolutions);
            }
            
        }


    }

    
  
    
}
function transformArrayIndexIntoMatrixPosition(posibility, arrayForPositionsSolution, cols){
    for(let i =0; i<posibility.length;i++){
        
        arrayForPositionsSolution.push([ parseInt(posibility[i]/cols) , posibility[i]%cols]);
    }
}

function insertIntoMatrix(currentSolution, matrixCostos, destinyValues){
    for(let i = 0; i < matrixCostos.length ; i++){
        var auxiliar3 = [];
        for(let j = 0; j < matrixCostos[i].length ; j++){
            if(currentSolution[i][j] != 0){
                auxiliar3.push(matrixCostos[i][j]);
            }else{
                auxiliar3.push(0);
            }
        }
        destinyValues.push(auxiliar3);
    }
}

function createNewMatrixWithSelectedPath(matrix, matrixOrig, arrayOfSolution, maximaze ){
    
    var auxlia = [];
    for(let i = 1 ; i < arrayOfSolution.length ; i = i + 2){
        auxlia.push(matrixOrig[ arrayOfSolution[i][0] ][ arrayOfSolution[i][1] ]);
    }
    
    
    
 
    var num = auxlia[0];
    for(let i = 0 ; i < auxlia.length ; i++){
        if(auxlia[i] < num){
            num = auxlia[i];
        }
    }
    for(let i = 0; i < arrayOfSolution.length; i++){
        
        if(i%2 === 0 ){
            matrix[ arrayOfSolution[i][0] ][ arrayOfSolution[i][1] ] = matrixOrig[ arrayOfSolution[i][0] ][ arrayOfSolution[i][1] ] + num;
        }else{
            matrix[ arrayOfSolution[i][0] ][ arrayOfSolution[i][1] ] = matrixOrig[ arrayOfSolution[i][0] ][ arrayOfSolution[i][1] ] - num;
        }
    }


    
}

function hasAllPairs(posibleRes, matrix){
 
    for(let i = 0 ;  i < matrix.length; i++){
        var resAux  = checkAllPairsForthisArray(matrix[i]);
        posibleRes.push(resAux);
    }
}
function checkAllPairsForthisArray(array){
    var res = false;
    if(array.length%2 ===0){
        var rows = [];
        var cols = [];
        for(let i = 0; i < array.length;  i++){
            rows.push(array[i][0]);
            cols.push(array[i][1]);
        }
        

    
        rows.sort(function(a,b){
            return a-b;
        });
        cols.sort(function(a,b){
            return a-b;
        });

         

        for(let y = 0 ; y < array.length ; y = y+2){
            if(rows[y] === rows[y+1]){
                res = true;
                
            }else{
                res = false;
                break
            }

            if(cols[y] === cols[y+1]){
                res = true;
                
            }else{
                res = false;
                break
            }
        }
    }
    
    return res;
 

}

function uniqBy(a, key){
    var seen ={};
    return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}
function procesoInversoArrayToMatrix(arrayResult, number, nroCols){
    
        arrayResult.push([  parseInt(number/nroCols )  , number%nroCols  ]  );
    
}
function checkForDoubleArray(arrayResult, posibility){
    for(let i = 0 ; i< posibility.length ; i++){
        var current = posibility[i];
        var contador = -1;
        for(let a = i; a< posibility.length ; a++){
            if(JSON.stringify(current) === JSON.stringify(posibility[a])){
                contador++;
            }
        }
        if(contador > 0){
            arrayResult.push(posibility[i]);
        }
    }
}
function transformIntoIndexOfArray(nroCols, row, col){
    return row*nroCols + col;
}
function getAllPosiblePaths(positionsVisited, matrix, posLook, positionsToIterate, posibility, forRows){
    var aux1 = [];
    var copyPositionsVisisted  = positionsVisited.slice();

    for(let i = 0; i < positionsToIterate.length ; i++){
        var numAuxVisisted = transformIntoIndexOfArray(matrix[0].length, positionsToIterate[i][0], positionsToIterate[i][1]);
        if(!copyPositionsVisisted.includes( numAuxVisisted) ){
            if(forRows){
                if(posLook[0] === positionsToIterate[i][0]){
                    
                        aux1.push(positionsToIterate[i]);
                }
                    
                
            }else{
                if(posLook[1] === positionsToIterate[i][1]){
                    aux1.push(positionsToIterate[i]);
                }
            }
        }
        
    }
     
    if(aux1.length === 0 ){
        posibility.push(copyPositionsVisisted);
    }
     
    // if(copyPositionsVisisted.length%2 === 0 ){
    //     var aray = [];
    //     console.log('copy posiution visited');
    //     console.log(copyPositionsVisisted);
    //     transformArrayIndexIntoMatrixPosition(copyPositionsVisisted, aray, matrix[0].length);
    //      console.log(aray); 
    //     if(checkAllPairsForthisArray(aray)){
    //         console.log('POSIBLE PUTO CANDIDATO');
    //         console.log(aray);
    //     }
    // }
    for(let i = 0; i < aux1.length ; i++){
        var copyPositionsVisisted2 = copyPositionsVisisted.slice();
        var aux2 = transformIntoIndexOfArray(matrix[0].length, aux1[i][0], aux1[i][1] );
         
            
        copyPositionsVisisted2.push(aux2);
            if(copyPositionsVisisted2.length %2 === 0 ){

                var aray = [];
                transformArrayIndexIntoMatrixPosition(copyPositionsVisisted2, aray, matrix[0].length);
                if(checkAllPairsForthisArray(aray)){
                      
                    getAllPosiblePaths(copyPositionsVisisted2, matrix, aux1[i], [] , posibility, !forRows);
                }else{
                    
                    getAllPosiblePaths(copyPositionsVisisted2, matrix, aux1[i], positionsToIterate, posibility, !forRows);
                }
            }else{

                getAllPosiblePaths(copyPositionsVisisted2, matrix, aux1[i], positionsToIterate, posibility, !forRows);
            }
            
         
 

    }
    
    

}

function getAllPOsitionsForInstance(matrix, arrayForPush, posLooked){
    for(let i=0 ; i < matrix.length ; i++){
        for(let j =0 ; j < matrix[0].length ; j++){
            if(matrix[i][j] != 0){
                if(i === posLooked[0] && j === posLooked[1]){

                }else{
                    arrayForPush.push([i,j]);
                }
                
                                
            }
        }
    }
}

function getMaxOrMin(pos, matrix, max){
    var row = 0 ;
    var col = 0;
    var current = matrix[row][col];
    for(let i=0; i < matrix.length ; i++){
        for(let j = 0 ; j < matrix[i].length ; j++){
            if(max){
                if(   matrix[i][j] > current ){
                    current = matrix[i][j];
                    row = i;
                    col = j;
                }
            }else{
                if(   matrix[i][j] < current ){
                    current = matrix[i][j];
                    row = i;
                    col = j;
                }
            }
        }
    }

    pos.push(row);
    pos.push(col);
}

function restarMatrices(resMatrix, initialMatrix, minuMatrix){
    for(let i=0 ; i<initialMatrix.length ; i++){
        var aux = [];
        for(let j =0 ; j < initialMatrix[i].length ; j++){
            aux.push(initialMatrix[i][j] - minuMatrix[i][j] );

        }
        resMatrix.push(aux);
    }
}

function refillMatricWithVectors(matrix, vecVer, vecHori){
    for(let row = 0;  row < vecVer.length ; row++){
        var axu = [];
        for(let col = 0; col < vecHori.length ; col++){
            axu.push(vecHori[col]+vecVer[row]);

        }
        matrix.push(axu);
    }
}

function refillVectors(vector,size,  firstOne, selectedVals){
    for(let i = 0; i < size ; i++){
        if(firstOne){
            if(i === 0){
                vector.push(getMinOfAllMatrix(selectedVals));
            }else{
                vector.push(0); 
                
            }
        }else{
            vector.push(0);
        }
    }
}

function getMinOfAllMatrix(matrix){
    var min = getMaxOfAllMatrix(matrix);
    if(min != 0 ){
        for(let i = 0 ; i < matrix.length ; i++){
            for(let j = 0; j < matrix[0].length ; j++){
                if(matrix[i][j] < min && matrix[i][j] > 0){
                    min = matrix[i][j];
                }
            }
        }
    }
    
    return min;
}
function getMaxOfAllMatrix(matrix){
    var max = 0;
    for(let i = 0 ; i < matrix.length ; i++){
        for(let j = 0; j < matrix[0].length ; j++){
            if(matrix[i][j] > max){
                max = matrix[i][j];
            }
        }
    }
    return max;
}
function asummepositionFrOriginalMatrix(secondMatrix,  thirdMatrix, matrixCostos, secVecVert, secVecHori){
    
    var rowsUsed = [0];
    var colsUsed = [];  
    
    for(let row = 0; row < matrixCostos.length ; row++){
        var aux = [];
        for(let col = 0 ; col < matrixCostos[row].length ; col++){
             if(secondMatrix[row][col] != 0){
                aux.push(matrixCostos[row][col]);

                 var numInCostosMatrix = matrixCostos[row][col];
                 var numInVertical = secVecVert[row];
                 var numInHorizontal = secVecHori[col];

                 if(numInCostosMatrix-numInVertical-numInHorizontal != 0 ){
                     if(rowsUsed.includes(row)){
                         colsUsed.push(col);
                        secVecHori[col] = numInCostosMatrix-numInVertical-numInHorizontal;
                     }else{
                         rowsUsed.push(row);
                         secVecVert[row] = numInCostosMatrix - numInVertical - numInHorizontal;
                     }
                 }else{
                    if(rowsUsed.includes(row)){
                        colsUsed.push(col);
                   
                    }else{
                        rowsUsed.push(row);
                        
                    }
                 }
                // var auxiliar2 = [];
                // auxiliar2.push(numInCostosMatrix);
                // auxiliar2.push(numInVertical);
                // auxiliar2.push(numInHorizontal);

                // auxiliar2.sort();


             }else{
                 aux.push(0);
             }
        }
        
    }

  


}

function getNumberToPush(row, col, vectorH, vectorV, secondMatrix){
     
}
 
function refillWithZeros(matrixParaCerear , rows, cols){
    for(let i=0; i < rows;  i++){
        var auxiliar = [];
        for(let j = 0 ; j < cols; j++){
            auxiliar.push(0);
        }
        matrixParaCerear.push(auxiliar);
    }
    
}

function findSumCol(matrix, col){
    var sum = 0;
    for(let i = 0; i <  matrix.length ; i++){
        sum += matrix[i][col];
    }
    return sum;
}

function findSumArray(array){
    var sum = 0;
    for(let i = 0 ; i <  array.length ; i++){
        sum += array[i];
    }
    return sum;
}