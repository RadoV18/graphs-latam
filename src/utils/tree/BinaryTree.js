import { inOrden, postOrden, preOrden} from "../tree/Node";

class Node {
    constructor(data){
        this._data = data;
        this._left = null;
        this._right = null;
    }

    get data(){
        return this._data;
    }

    get left(){
        return this._left;
    }

    get right(){
        return this._right;
    }

    set data(data){
        this._data = data;
    }

    set left(left){
        this._left = left;
    }

    set right(right){
        this._right = right;
    }
}


class Tree {
    constructor(){
        this._root = null;
        this._dataLeft = [];
        this._dataRight = [];
    }

    get root(){
        return this._root;
    }

    get data(){
        return this._dataLeft.concat(this._dataRight);
    }

    add(data){
        let node = new Node(data);
        if( this._root == null){
            this._root = node;
        }else{
            let current = this._root;
            while(current!= null){
                if (current.data > data) {
                    if (current.left == null) { // Tengo el espacio vacio para agregar el nodo
                        current.left = node;
                        this._dataLeft.push({data: { source: ''+current.data, target: ''+ node.data }});
                        break; // Terminamos el recorrido
                    } else { // continuo bajando por la rama izquierda
                        current = current.left;
                    }
                } else if (current.data < data) {
                    if (current.right == null) { // Tengo el espacio vacio para agregar el nodo
                        current.right = node;
                        this._dataRight.push({data: { source: ''+current.data, target: ''+ node.data }});
                        break; // Terminamos el recorrido
                    } else { // continuo bajando por la rama derecha
                        current = current.right;
                    }
                } else { // igual a cero
                    // Entonces el elemento ya existe.
                    break;
                }
            }
        }
    }

}


function crearTree (arreglo){
    var nodes = [];
    let arbol = new Tree();
    arreglo.forEach(element => {
        nodes.push( {data: { id: ""+element } });
        arbol.add(element);
    });
    let root = arbol.root;
    var VinOrden = inOrden(root);
    var VpostOrden = postOrden(root);
    var VpreOrder = preOrden(root);
    return [arbol, nodes, [VinOrden, VpostOrden, VpreOrder]];
}

export const binaryTree = (arreglo) =>{
    const [arbol, nodes, orden] = crearTree(arreglo);
    const edges = arbol.data;
    return [nodes, edges, orden];






}