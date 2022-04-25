export const animatedBubbleSort = (arrayNumeros) => {
    const arrayLength = arrayNumeros.length;
    console.log(arrayNumeros);
    const result = [ {
        array: [...arrayNumeros],
        indexes: [-1, -1]
    }, ];

    for (let i = 0; i < arrayLength; i++) {
        for (let j = 0; j < arrayLength; j++) {
            const object = {};
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
                object["array"] =  [...arrayNumeros];
                object["indexes"] = [ j, j + 1 ];
                result.push(object);
            }
        }
    }

    // Debug: Imprimir el Array
    // console.log(`array ordenado: ${arrayNumeros.toString()}`);
    return result;
};