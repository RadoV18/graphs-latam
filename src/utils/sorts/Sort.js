// ! Selection Sort
// let inputArr = [5, 2, 4, 6, 1, 3, 6, 6, 1, 8, 7];
// selectionSort(inputArr);
// console.log(inputArr);
//Tenemos que mostrar el array con elementos en un objeto
export const selectionSort = (inputArr) => {
    const n = inputArr.length;

    for (let i = 0; i < n; i++) {
        // Encontrando el numero mas pequeño en el array
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (inputArr[j] < inputArr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            // Intercambiando elementos
            let tmp = inputArr[i];
            inputArr[i] = inputArr[min];
            inputArr[min] = tmp;
        }
    }
    return inputArr;
}

// ! Insertion Sort

// let inputArr = [5, 2, 4, 6, 1, 3];
// insertionSort(inputArr);
// console.log(inputArr);

export const insertionSort = (inputArr) => {
    const n = inputArr.length;
    for (let i = 1; i < n; i++) {
        // Eligiendo el primer elemento del sub array no ordenado
        let actual = inputArr[i];
        // El ultimo elemento del sub array no ordenado
        let j = i - 1;
        while (j > -1 && actual < inputArr[j]) {
            inputArr[j + 1] = inputArr[j];
            j--;
        }
        inputArr[j + 1] = actual;
    }
    return inputArr;
}

// ! ShellSort

export const shellSort = (arr) => {
    var len = arr.length;
    //Dividir el array en dos
    var gapSize = Math.floor(len / 2);

    while (gapSize > 0) {
        for (var i = gapSize; i < len; i++) {
            var temp = arr[i];
            var j = i;

            while (j >= gapSize && arr[j - gapSize] > temp) {
                arr[j] = arr[j - gapSize];
                j -= gapSize;
            }
            arr[j] = temp;
        }
        gapSize = Math.floor(gapSize / 2);
    }
    return arr;
}

export const isSorted = (array) => {
    for (let i = 1, size = array.length; i < size; i++) {
        if (array[i] < array[i - 1]) {
            return false;
        }
    }
    return true;
}

// var randomArray = [45,86,3,5,97,95,4,24,7,88,93,27,45,90,54,89,74,5,90,73,74,857,834,8394,4231,485,32,54,674,12];
// var mySortedArray = shellSort(randomArray);
// console.log(mySortedArray);

// ! Merge Sort

// array = [4, 8, 7, 2, 11, 1, 3];
// console.log(mergeSort(array));

export const merge = (left, right) => {
    let arr = [];
    // Rompe el loop cuando ambos estan vacios
    while (left.length && right.length) {
        // Elige el mas peque;o entre los elementos de izquierda a derecha en el sub array
        if (left[0] < right[0]) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }

    // Concatenar los elementos restantes
    // (en caso de que haya ocurrido un error o no hayamos pasado de izquierda a derecha por el array)
    return [...arr, ...left, ...right];
}

export const mergeSort = (array) => {
    const half = array.length / 2;

    if (array.length < 2) {
        return array;
    }

    const left = array.splice(0, half);
    return merge(mergeSort(left), mergeSort(array));
}

// ! bubble Sort

export const bubbleSort = (arrayNumeros) => {
    const arrayLength = arrayNumeros.length;

    for (let i = 0; i < arrayLength; i++) {
        for (let j = 0; j < arrayLength; j++) {
            // Solo para debug
            // console.log(`i: ${i} - j: ${j}`);
            // console.log(`arrayNumeros[i]: ${arrayNumeros[i]} | arrayNumeros[j]: ${arrayNumeros[j]}`);

            // Revisar si el numero actual es mayor que el siguiente
            if (arrayNumeros[j] > arrayNumeros[j + 1]) {
                // Almacenar el valor actual para cambiarlo
                const numeroActual = arrayNumeros[j];

                // Ahora la posicion actual toma el valor de la siguiente posicion
                // Y la siguiente posicion toma el valor del numero actual
                arrayNumeros[j] = arrayNumeros[j + 1];
                arrayNumeros[j + 1] = numeroActual;
            }
        }
    }

    // Debug: Imprimir el Array
    // console.log(`array ordenado: ${arrayNumeros.toString()}`);
    return arrayNumeros;
};

// const numeros = [
//   [3, 10, 5, 7],
//   [8, 5, 2, 9, 5, 6, 3],
//   [4, 50, 28, 47, 9, 2097, 30, 41, 11, 3, 68],
//   [3, 10, 5, 7, 8, 5, 2, 9, 5, 6, 3]
// ];

// numeros.forEach(element => {
//   bubbleSort(element);
// });
