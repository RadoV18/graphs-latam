

export const convertirArregloNumeros = (input) =>{
    input.replace(/\s+/g, '')
    var arreglo = input.split(',');
    arreglo = arreglo.map((elem) => parseFloat(elem));
    console.log(arreglo);
    return arreglo;
}

//Retorna el arreglo con los valores cantidad, minimo, maximo, decimales deseados
export const arregloRandomico = (cant, min, max, decimales) =>{
    var arreglo = [];
    for(let i=0; i<cant; i++){
        var rand = Math.random() * (max - min) + min;
        rand = rand.toFixed(decimales);
        rand = parseInt(rand,10);
        arreglo.push(rand);
    }
    return arreglo;
}


export const execTimeSelectionSort = (input) =>{ // O(n2)
    let inicio = new Date();
    arreglo = selectionSort(input);
    let fin = new Date();
    const realTime = (fin - inicio)/1000;
    const teoricTime = (Math.pow(input.length,2))/Math.pow(10,8);
    return [realTime, teoricTime];
}

export const execTimeInsertionSort = (input) =>{ // O(n)
    let inicio = new Date();
    //Aca debe ir la funcion 
    let fin = new Date();
    const realTime = (fin - inicio)/1000;
    const teoricTime = (input.length)/Math.pow(10,8);;
    return [realTime, teoricTime];
}

export const execTimeShellSort = (input) =>{ // O(n3/2)
    let inicio = new Date();
    //Aca debe ir la funcion 
    let fin = new Date();
    const realTime = (fin - inicio)/1000;
    const teoricTime = Math.pow(input.length, 3/2)/Math.pow(10,8);
    return [realTime, teoricTime];
}

export const execTimeMergeSort = (input) =>{ // O(nLogn)
    let inicio = new Date();
    //Aca debe ir la funcion 
    let fin = new Date();
    const realTime = (fin - inicio)/1000;
    const teoricTime = (input.length)*Math.log(input.length)/Math.pow(10,8);
    return [realTime, teoricTime];
}

