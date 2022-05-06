class NodeClase{
    constructor(valor){
        this.valor = valor;
        this.left = null;
        this.right = null;
    }

    setLeft(left1){
        this.left = left1;
    }
    setRight(right1){
        this.right = right1;
    }
    
    getValue(){
        return this.valor;
    }

}

/* var inorder = [3,5,6,7,8,10,11,12,13];
var preoder = [6,3,5,10,7,8,12,11,13];
var postorder = [5,3,8,7,11,13,12,10,6];

var nodoCurrent  = preoderAndPostorder(preoder, postorder, false    );
console.log(nodoCurrent); */

function preoderAndInorder(preoder, inorder){
    var slicedLeft = [];
    var slicedRight = [];
    var pointer = preoder[0];
    var positionLooked = inorder.indexOf(pointer);
    var nodo = new NodeClase(inorder[positionLooked]);
    var auxLeft = inorder.slice(0, positionLooked);  
    var auxRight = inorder.slice(positionLooked+1 , inorder.length);  
    downRecursivelyPreorderAndInorder(auxLeft, nodo, auxRight, preoder);
    return nodo;

}
function postorderAndInorder(postorder, inorder){
    var slicedLeft = [];
    var slicedRight = [];

    var pointer = postorder[postorder.length-1];
    var positionLooked = inorder.indexOf(pointer);
    
    var nodo = new NodeClase(inorder[positionLooked]);

    var auxLeft = inorder.slice(0, positionLooked);  
    var auxRight = inorder.slice(positionLooked+1 , inorder.length);  

    downRecursivelyPostorderAndInorder(auxLeft, nodo, auxRight, postorder);
    return nodo;
}
export const preorderAndPostorder = (preoder1, postorder1, isSorted) =>{
    var preoder = preoder1.slice();
    var postorder = postorder1.slice();
    var inorder1 = [];
    var inorder2 = [];
    var dataL = [];
    var dataR = [];
    if(isSorted){
        inorder1 = preoder1.sort( (a,b) => a-b );
        inorder2 = postorder1.sort( (a,b) => a-b );
        if(JSON.stringify(inorder1) === JSON.stringify(inorder2)){
            var inorder = inorder1;
            var pointer = postorder[postorder.length-1];
            var positionLooked = inorder.indexOf(pointer);
            var nodo = new NodeClase(inorder[positionLooked]);
            
            var auxLeft = inorder.slice(0, positionLooked);  
            var auxRight = inorder.slice(positionLooked+1 , inorder.length);  

            downRecursivelyPostorderAndInorder(auxLeft, nodo, auxRight, postorder, dataL, dataR);
            var data = dataL.concat(dataR);
            console.log(data);
            return data;
        }
    }else{
    

        var valueInNode = preoder[0];

        var valueLocatedPre = preoder[1];
        var valueLocatedPost = postorder[postorder.length - 2];

        var slicedPostLeft = postorder.slice(0, postorder.indexOf(valueLocatedPre)+1);
        var slicedPreRight = preoder.slice(preoder.indexOf(valueLocatedPost) , preoder.length);

        var slicedPostRight = postorder.slice(postorder.indexOf(valueLocatedPre)+1, postorder.indexOf(valueInNode));
        var slicedPreLeft = preoder.slice(preoder.indexOf(valueInNode)+1, preoder.indexOf(valueLocatedPost));

        console.log(slicedPostLeft, valueInNode, slicedPostRight);
        console.log(slicedPreLeft, valueInNode, slicedPreRight);
        var nodoMain = new NodeClase(valueInNode);
        
        goDownRecursivelyPreorderAndPostorder(slicedPreLeft, slicedPostLeft, nodoMain, slicedPostRight, slicedPreRight, dataL, dataR);
        var data2 = dataL.concat(dataR);
        console.log(data2);
        return data2;
    }
}

function goDownRecursivelyPreorderAndPostorder(slicedPreLeft1, slicedPostLeft1, nodo, slicedPostRight1, slicedPreRight1, dataL, dataR){
    var slicedPreLeft = slicedPreLeft1.slice();
    var slicedPostLeft = slicedPostLeft1.slice();
    var slicedPostRight = slicedPostRight1.slice();
    var slicedPreRight = slicedPreRight1.slice();
    var slicedDataL = dataL.slice();
    var slicedDataR = dataR.slice();

    
    if(slicedPreLeft.length <= 2 || slicedPostLeft.length <= 2){
        if(slicedPreLeft.length === 2 && slicedPostLeft.length === 2){
            
            if(slicedPreLeft[0] === slicedPostLeft[slicedPostLeft.length-1]){
                var currentNode = new NodeClase(slicedPreLeft[0]);
                var secondNode = new NodeClase(slicedPreLeft[1]);
                currentNode.setLeft(secondNode);
                slicedDataL.push({data: { source: ''+currentNode.getValue, target: ''+ secondNode.getValue }});
                nodo.setLeft(currentNode);
                slicedDataL.push({data: { source: ''+nodo.getValue, target: ''+ currentNode.getValue }});
            }
        }
        
        if(slicedPreLeft.length === 1){
            nodo.setLeft(new NodeClase(slicedPreLeft[0]));
            slicedDataL.push({data: { source: ''+nodo.getValue, target: ''+ slicedPreLeft[0] }});
        }
        if(slicedPostLeft.length === 1){
            nodo.setLeft(new NodeClase(slicedPostLeft[0]));
            slicedDataL.push({data: { source: ''+nodo.getValue, target: ''+ slicedPostLeft[0] }});
        }
    }else{
        var valueForNode = slicedPreLeft[0];

        var nextValuePre = slicedPreLeft[1];
        var prevValuePost = slicedPostLeft[slicedPostLeft.length - 2];

        var sPostLeft = slicedPostLeft.slice(0, slicedPostLeft.indexOf(nextValuePre));
        var sPreRight = slicedPreLeft.slice(slicedPreLeft.indexOf(prevValuePost), slicedPreLeft.length);

        var sPostRight = slicedPostLeft.slice(slicedPostRight.indexOf(nextValuePre)+1, slicedPostLeft.indexOf(valueForNode));
        var sPreLeft = slicedPreLeft.slice(slicedPreLeft.indexOf(valueForNode) + 1 , slicedPreLeft.indexOf(prevValuePost));

        var nodoCurrent = new NodeClase(slicedPreLeft[0]);
        nodo.setLeft(nodoCurrent);
        slicedDataL.push({data: { source: ''+nodo.getValue, target: ''+ nodoCurrent.getValue }});

        goDownRecursivelyPreorderAndPostorder(sPreLeft, sPostLeft, nodoCurrent, sPostRight, sPreRight, slicedDataL, slicedDataR);
    }

    if(slicedPostRight.length <= 2 || slicedPreRight.length <= 2){
        if(slicedPreRight.length === 2 && slicedPostRight.length === 2){
            if(slicedPreRight[0] === slicedPostRight[slicedPostRight.length-1]){
                var currentNode  = new NodeClase(slicedPreRight[0]);
                var secondNode = new NodeClase(slicedPreRight[1]);
                currentNode.setRight(secondNode);
                slicedDataR.push({data: { source: ''+currentNode.getValue, target: ''+ secondNode.getValue }});
                nodo.setRight(currentNode);
                slicedDataR.push({data: { source: ''+nodo.getValue, target: ''+ currentNode.getValue }});
            }
        }
        if(slicedPostRight.length === 1){
            nodo.setRight(new NodeClase(slicedPostRight[0]));
            slicedDataR.push({data: { source: ''+nodo.getValue, target: ''+ slicedPostRight[0]}});
        }
        if(slicedPreRight.length === 1){
            nodo.setRight(new NodeClase(slicedPreRight[0]));
            slicedDataR.push({data: { source: ''+nodo.getValue, target: ''+ slicedPreRight[0]}});
        }

        
    }else{
        var valueForNode = slicedPreRight[0];

        var nextValuePre = slicedPreRight[1];
        var prevValuePost = slicedPostRight[slicedPostRight.length - 2];

        var sPostLeft = slicedPostRight.slice(0, slicedPostRight.indexOf(valueForNode));
        var sPreRight = slicedPreRight.slice(slicedPreRight.indexOf(prevValuePost), slicedPreRight.length);

        var sPostRight = slicedPostRight.slice(slicedPostRight.indexOf(nextValuePre)+1, slicedPostRight.indexOf(valueForNode));
        var sPreLeft = slicedPreRight.slice(slicedPreRight.indexOf(valueForNode)+1, slicedPreRight.indexOf(prevValuePost));

        var nodoCurrent = new NodeClase(slicedPreRight[0]);
        nodo.setRight(nodoCurrent);
        slicedDataR.push({data: { source: ''+nodo.getValue, target: ''+ nodoCurrent.getValue}});
        goDownRecursivelyPreorderAndPostorder(sPreLeft, sPostLeft, nodoCurrent, sPostRight, sPreRight, slicedDataL, slicedDataR);


    }
}

function downRecursivelyPostorderAndInorder(arrayForLeftOri, nuevoNodo, arrayForRightOri, postorder){
    

    var arrayForLeft = arrayForLeftOri.slice();

    var arrayForRight = arrayForRightOri.slice();

    if(arrayForLeft.length <= 1){
        if(arrayForLeft.length === 1){
            nuevoNodo.setLeft(new NodeClase(arrayForLeft[0]));
        }
    }else{
        var pointerLeft2 = -1;
        var pointerLeft = 0;
        for(let l = 0 ; l < arrayForLeft.length ; l++){
            if(postorder.indexOf(arrayForLeft[l]) > pointerLeft2){
                pointerLeft2 = postorder.indexOf(arrayForLeft[l]);
                pointerLeft = l;
            }
        }
        var currentNodeLeft = new NodeClase(arrayForLeft[pointerLeft]);
        
        nuevoNodo.setLeft(currentNodeLeft);
        var auxLeftofLeft = arrayForLeft.slice(0,pointerLeft);
        var auxRightofLeft = arrayForLeft.slice(pointerLeft+1, arrayForLeft.length);
        
        downRecursivelyPostorderAndInorder(auxLeftofLeft, currentNodeLeft, auxRightofLeft, postorder);

    }

    if(arrayForRight.length <= 1){
        if(arrayForRight.length === 1){
            nuevoNodo.setRight(new NodeClase(arrayForRight[0]));
        }
    }else{
        
        var pointerRight2 = -1;
        var pointerRight = 0;
        for(let r = 0; r < arrayForRight.length ; r++){
            
            if(postorder.indexOf(arrayForRight[r]) > pointerRight2){
                pointerRight2 = postorder.indexOf(arrayForRight[r]);
                 pointerRight = r;
                                
            }
        }
        
       
        var currentNodeRight = new NodeClase(arrayForRight[pointerRight]);
        nuevoNodo.setRight(currentNodeRight);
        var auxLeftofRight = arrayForRight.slice(0, pointerRight);
        var auxRightofRight = arrayForRight.slice(pointerRight+1 , arrayForRight.length);
        
        downRecursivelyPostorderAndInorder(auxLeftofRight, currentNodeRight, auxRightofRight, postorder);
        
    }
  
}

function downRecursivelyPreorderAndInorder(arrayForLeftOri, nuevoNodo, arrayForRightOri, preoder){
     

    var arrayForLeft = arrayForLeftOri.slice();

    var arrayForRight = arrayForRightOri.slice();

    if(arrayForLeft.length <= 1){
        if(arrayForLeft.length === 1){
            nuevoNodo.setLeft(new NodeClase(arrayForLeft[0]));
        }
        
    }else{
        var pointerLeft2 = preoder.length + 1;
        var pointerLeft = 0;
        for(let l = 0 ; l < arrayForLeft.length ; l++){
            if(preoder.indexOf(arrayForLeft[l]) < pointerLeft2){
                pointerLeft2 = preoder.indexOf(arrayForLeft[l]);
                pointerLeft = l;
            }
        }
        var currentNodeLeft = new NodeClase(arrayForLeft[pointerLeft]);
        
        nuevoNodo.setLeft(currentNodeLeft);
        var auxLeftofLeft = arrayForLeft.slice(0,pointerLeft);
        var auxRightofLeft = arrayForLeft.slice(pointerLeft+1, arrayForLeft.length);
        console.log(auxLeftofLeft,  arrayForLeft[pointerLeft], auxRightofLeft, "left");
        downRecursivelyPreorderAndInorder(auxLeftofLeft, currentNodeLeft, auxRightofLeft, preoder);

    }

    if(arrayForRight.length <= 1){
        if(arrayForRight.length === 1){
            nuevoNodo.setRight(new NodeClase(arrayForRight[0]));
        }
    }else{
        
        var pointerRight2 = preoder.length + 1;
        var pointerRight = 0;
        for(let r = 0; r < arrayForRight.length ; r++){
            console.log(preoder.indexOf(arrayForRight[r]));
            if(preoder.indexOf(arrayForRight[r]) < pointerRight2){
                pointerRight2 = preoder.indexOf(arrayForRight[r]);
                 pointerRight = r;
                                
            }
        }
        
     
        var currentNodeRight = new NodeClase(arrayForRight[pointerRight]);
        nuevoNodo.setRight(currentNodeRight);
        var auxLeftofRight = arrayForRight.slice(0, pointerRight);
        var auxRightofRight = arrayForRight.slice(pointerRight+1 , arrayForRight.length);
        
        downRecursivelyPreorderAndInorder(auxLeftofRight, currentNodeRight, auxRightofRight, preoder);
        
    }
  
}