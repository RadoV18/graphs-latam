/**
 * Algoritmo de Johnson
 * Entrada: matriz de adyacencia
*/

// {
//    labels: [],
//    matrix: [[], [], []]; 
// }
/* 
  Salida: objeto de lista de nodos y lista de aristas:
*/
// const result = {
//     nodes: [
//         {
//             label, 
//             earlyStart, // izquierdo
//             latestFinish, // derecho
//             isCritical (boolean)
//         }
//     ],
//     edges: [
//         {
//             source, (label del nodo)
//             destination, (label del nodo)
//             weight, // peso
//             slag // (holgura)
//         }
//     ]
// }
/*
se calcula la suma por fila y por columna 
de esa manera se identifica los nodos iniciales y finales 

si la suma por columna = 0 ; se considera que para esa posicion de la columna el nodo es inicial
si la suma por fila = 0 ; se considera que para esa posicion de la fila el nodo es el final

TODO: no se distingue si existe uno mas nodos iniciales o finales
*/
const validate = (matrix) => {
    let firstNode = -1;
    let lastNode = -1;

    for(let i=0 ; i< matrix.length ;i++){
        let columnSum = 0;
        let rowSum = 0;
        
        for(let j=0 ; j< matrix.length; j++ ){
            const rowWeight = matrix[i][j];
            const columnWeight = matrix[j][i];
            rowSum += (rowWeight <= 0 ? rowWeight + 1 : rowWeight);
            columnSum += (columnWeight <= 0 ? columnWeight + 1 : columnWeight);; 
        }
        if(columnSum === 0){
            if(firstNode === -1) {
                firstNode = columnSum;
            } else {
                throw new Error("Grafo inválido");
            }
        }
        if(rowSum === 0){
            if(lastNode === -1) {
                lastNode = columnSum;
            } else {
                throw new Error("Grafo inválido");
            }
        }
    }

    return { firstNode, lastNode };
}

const johnsonsAlgorithm = ({ labels, matrix }) => {
    const { firstNode, lastNode } = validate(matrix);
    if(firstNode === -1 || lastNode === -1) {
        throw new Error("Grafo inválido");
    }



    return {
        //nodes,
        //edges
    }
}


// TODO: recibirlos Parametros desde DISPATCH

const labels = [
    ["A", 0],
    ["B", 1],
    ["C", 2],
    ["D", 3],
    ["E", 4],
    ["F", 5],
    ["G", 6],
];
//matrix = [ [0,6,3,2,0,0,0],[0,0,0,0,4,0,0], [0,0,0,0,6,5,3], [0,0,0,0,0,8,0], [0,0,0,0,0,0,12],[0,0,0,0,0,0,9],[0,0,0,0,0,0,0] ];
const matrix = [
    [-1,  1, -1, -1, -1, -1, -1],
    [-1, -1,  2, -1, -1, -1, -1],
    [-1, -1, -1,  3,  4, -1, -1],
    [-1, -1, -1, -1,  0,  0, -1],
    [-1, -1, -1, -1, -1,  2, -1],
    [-1, -1, -1, -1, -1, -1,  3],
    [-1, -1, -1, -1, -1, -1, -1],
];

console.log( labels);
console.log(matrix);

// variable para almacenar la posicion del nodo inicial
const nodeBegin = [];

// variable para almacenar la posicion del nodo final
const nodeEnd = [];

 

// matriz donde se guardaran todos las sumas acumuladas de las posiciones de IDA
const matrixIda = [];

// matriz donde se guardaran todos las restas acumuladas de las posiciones de VUELTA
const matrixVuelta = [];
//  cererando la matrix 
// TODO: Se podria evitar cerear toda la matriz pero lo dejo asi nomas XD
for(let i=0 ; i < matrix.length ; i++){
    
    matrixIda.push([]);
  
    for(let j=0 ; j< matrix.length ; j++){
        matrixIda[i].push(0);
         
    }
}

/*
COmienza el verdadero algoritmo para identificar las sumas de IDA
teniendo en cuenta que:
posicion de fila = nodo inicial
posicion de columna = nodo final
*/
insertIntoMatrixPronto(0,nodeBegin[0], matrixIda);

function insertIntoMatrixPronto(add, row, matrixAux){
    for(let i=0 ; i < matrixAux.length ; i++ ){
        let aux = 0;
        if(matrix[row][i] != 0){
            
            aux = matrix[row][i]+add;
            if(matrixAux[row][i] > aux){
                aux =matrixAux[row][i] ;
            }
            insertIntoMatrixPronto(aux, i, matrixAux);
        }
        matrixAux[row][i]= aux;

    }
}
console.log("prueba de recursividad");
console.log(matrixIda);

 



const arrayProntoValues = [];
for(let i=0 ; i< matrix.length ;i++){ 
    arrayProntoValues.push(giveMeHighestOfColum(i, matrixIda));
}


console.log(arrayProntoValues);

// vuelta

for(let i=0 ; i < matrix.length ; i++){
    
    matrixVuelta.push([]);
  
    for(let j=0 ; j< matrix.length ; j++){
        matrixVuelta[i].push(arrayProntoValues[nodeEnd[0]]);
         
    }
}

insertIntoMatrixVuelta(arrayProntoValues[nodeEnd[0]], nodeEnd[0], matrixVuelta);
console.log(arrayProntoValues[nodeEnd[0]], nodeEnd[0])

function insertIntoMatrixVuelta(dism, col, matrixAuxx){
    for(let i=0 ; i < matrixAuxx.length ; i++ ){
        let aux = arrayProntoValues[nodeEnd[0]];
        if(matrix[i][col] != 0){
            
            aux = dism - matrix[i][col] ;
            if(matrixAuxx[col][i] < dism){
                aux = matrixAuxx[col][i] ;
            }
            insertIntoMatrixVuelta(aux , i, matrixAuxx);
        }
        matrixAuxx[col][i]= aux;

    }
}

console.log(matrixVuelta);

const arrayTardeValues = [];
for(let i=0 ; i< matrix.length ;i++){ 
    arrayTardeValues.push(giveLowestOfColumn(i, matrixVuelta));
}
console.log(arrayTardeValues);

 

const matrixSlag = [];
const arrayOfCriticalPath = [];
for(let i=0; i < matrix.length ; i++){
    matrixSlag.push([]);
    for(let j=0 ; j < matrix.length ; j++){
        let aux = -1;
        if(matrix[i][j] !== 0){
            aux = arrayTardeValues[j]-arrayProntoValues[i]-matrix[i][j];
            if(aux === 0){
                arrayOfCriticalPath.push([i, j]);
            }
        }
        matrixSlag[i].push(aux);
    }
}


const slagsByArista = [];
for(let i=0; i < matrix.length ; i++){
    for(let j=0 ; j < matrix.length ; j++){
        if(matrixSlag[i][j] != -1){
            slagsByArista.push([i,j,matrixSlag[i][j]]);
        }
    }
}



console.log(matrixSlag);
console.log(arrayOfCriticalPath);
console.log('slag for every edge');
console.log(slagsByArista);




function giveMeHighestOfColum(col, properMatrix){
    let n = 0;
    for(let i=0 ; i< properMatrix.length ;i++){
         if(properMatrix[i][col] > n){
             n = properMatrix[i][col];
             
         }
         
    }
    return n;
}
function giveLowestOfColumn(col, properMatrix){
    let n = giveMeHighestOfColum(col, properMatrix);
    for(let i=0 ; i< properMatrix.length ;i++){
         if(properMatrix[i][col] < n){
             n = properMatrix[i][col];
             
         }
         
    }
    return n;
}

/*
  variables donde se encuentran los datos:

  arrayProntoValues   // se encuentra los valores de lado pronto de todos los nodos, los nodos en base a su posicion del array 'Labels'  
  arrayTardeValues    // se encuentra los valores de lado tardio de todos los nodos, los nodos en base a su posicion del array 'Labels'
  slagsByArista       // se encuentra los valores de la holgura  =>        [posicionNodoInicial, posicionNodoFinal, holgura]
  arrayOfCriticalPath   // se encuentra las posiciones de los nodos que son la ruta critica =>  [posicionNodoInicial, posicionNodoFinal]  
                        // TODO: aqui se encuentra en desorden pero creo que este array puede servir para pintar la arista entre [posicionNodoInicial, posicionNodoFinal]

*/