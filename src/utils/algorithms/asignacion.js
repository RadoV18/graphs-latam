export const asignacionAlgorithm = (input) => {
    const matrix = input.adjacencyMatrix;
    const labels = input.indexes;
    // si el objetivo es maximizar: maximaze = true;
    // por el contrario si es minimizar: maximaze = false;
    const maximaze = input.maximaze;

    // TODO: verficar que la matrix sea cuadrada

    const copyOriginalMatrix  = matrix.map(function(arr) {
        return arr.slice();
    });


    operateForColumns(copyOriginalMatrix, maximaze);
    operateForRows(copyOriginalMatrix, maximaze);

    const { arrayPositionZeros } = getPositionOfZeros(copyOriginalMatrix);

}

function operateForColumns(copyMatrix, maximaze){
    for(let col = 0 ; col < copyMatrix[0].length; col++){
        let currentNum = copyMatrix[0][col];
        for(let row = 0 ; row < copyMatrix.length; row++){
            if(maximaze){
                if(copyMatrix[row][col] > currentNum){
                    currentNum = copyMatrix[row][col];
                }
            }else{
                if(copyMatrix[row][col] < currentNum){
                    currentNum = copyMatrix[row][col];
                }
            }
        }
    
        for(let row2 = 0; row2 < copyMatrix.length; row2++){
            copyMatrix[row2][col] -= currentNum; 
        }
    }
}
function operateForRows(copyMatrix, maximaze){
    for(let row = 0 ; row < copyMatrix.length; row++){  
        let currentNum = copyMatrix[row][0];
        for(let col = 0 ; col < copyMatrix[row].length; col++){
            if(maximaze){
                if(copyMatrix[row][col] > currentNum){
                    currentNum = copyMatrix[row][col];
                }
            }else{
                if(copyMatrix[row][col] < currentNum){
                    currentNum = copyMatrix[row][col];
                }
            }
        }
    
        for(let col2 = 0; col2 < copyMatrix[0].length; col2++){
            copyMatrix[row][col2] -= currentNum; 
        }
    }
}
function getPositionOfZeros(copyMatrix){
    const arrayPostionOfZeros = [];
    for(let row=0; row<copyMatrix.length; row++){
        for(let col=0 ; col< copyMatrix[row].length ; col++){
            if(copyMatrix[row][col] === 0){
                arrayPostionOfZeros.push([row,col]);
            }
        }
    }
    return {arrayPostionOfZeros};
}