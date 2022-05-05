
function printInOrder(cadena, nodo) {
    if( nodo.left != null){
        printInOrder(cadena, nodo.left);
        cadena.push(nodo.data);
    }else{
        cadena.push(nodo.data);
    }
    if( nodo.right != null){
        printInOrder(cadena, nodo.right);      
    }
}

function printPreOrder(cadena, nodo){
    cadena.push(nodo.data);
    if( nodo.left!=null){
        printPreOrder(cadena, nodo.left);
    }
    if( nodo.right!=null){
        printPreOrder(cadena, nodo.right);
    }
}

function printPostOrder(cadena, nodo){
    if( nodo.left != null){
        printPostOrder(cadena, nodo.left);
    }
    if( nodo.right != null){
        printPostOrder(cadena, nodo.right);
    }
    cadena.push(nodo.data);
}

export const inOrden = (root) =>{
    var orden = [];
    printInOrder(orden, root);
    return [orden];
};

export const postOrden = (root) =>{
    var orden = [];
    printPostOrder(orden, root);
    return [orden];
};
export const preOrden = (root) =>{
    var orden = [];
    printPreOrder(orden, root);
    return [orden];
};


