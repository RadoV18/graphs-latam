import {
    selectionSort,
    insertionSort,
    shellSort,
    mergeSort,
    bubbleSort,
} from "../sorts/Sort";

export const convertirArregloNumeros = (input) => {
    input.replace(/\s+/g, "");
    var arreglo = input.split(",");
    arreglo = arreglo.map((elem) => parseFloat(elem));
    return arreglo;
};

//Retorna el arreglo con los valores cantidad, minimo, maximo, decimales deseados
export const arregloRandomico = (cant, min, max, decimales) => {
    var arreglo = [];
    for (let i = 0; i < cant; i++) {
        var rand = Math.random() * (max - min) + min;
        rand = rand.toFixed(decimales);
        rand = parseInt(rand, 10);
        arreglo.push(rand);
    }
    return arreglo;
};

export const execTimeSelectionSort = (input) => {
    // O(n2)
    let inicio = performance.now();
    console.log(inicio);
    const result = selectionSort(input);
    let fin = performance.now() - inicio;
    const realTime = fin;
    const theoreticalTime = Math.pow(input.length, 2) / Math.pow(10, 5);
    return { result, realTime, theoreticalTime };
};

export const execTimeInsertionSort = (input) => {
    // O(n^2)
    let inicio = performance.now();
    console.log(inicio);
    const result = insertionSort(input);
    let fin = performance.now() - inicio;
    const realTime = fin;
    const theoreticalTime = Math.pow(input.length, 2) / Math.pow(10, 5);
    return { result, realTime, theoreticalTime };
};

export const execTimeShellSort = (input) => {
    // O(n3/2)
    let inicio = performance.now();
    console.log(inicio);
    const result = shellSort(input);
    let fin = performance.now() - inicio;
    const realTime = fin;
    const theoreticalTime = Math.pow(input.length, 3 / 2) / Math.pow(10, 5);
    return { result, realTime, theoreticalTime };
};

export const execTimeMergeSort = (input) => {
    // O(nLogn)
    let inicio = performance.now();
    console.log(inicio);
    const result = mergeSort(input);
    let fin = performance.now() - inicio;
    const realTime = fin;
    console.log("input", input);
    const theoreticalTime =
        (result.length * Math.log(result.length)) / Math.pow(10, 5);
    return { result, realTime, theoreticalTime };
};

export const execTimeBubbleSort = (input) => {
    const inicio = performance.now();
    console.log(inicio);
    const result = bubbleSort(input);
    const elapsed = performance.now() - inicio;
    const realTime = elapsed;
    const theoreticalTime = Math.pow(input.length, 2) / Math.pow(10, 5);
    return { result, realTime, theoreticalTime };
};
