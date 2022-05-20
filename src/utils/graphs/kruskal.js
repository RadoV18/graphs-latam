import UnionFind from './ufds';

/**
 * @param {Array<Array<Number>>} adjacencyMatrix 
 * @returns {Array<Array<Number>>} edgeList
 */
const adjacencyMatrixToEdgeList = (adjacencyMatrix) => {
    let edgeList = [];
    for (let i = 0; i < adjacencyMatrix.length; i++) {
        for (let j = 0; j < adjacencyMatrix[i].length; j++) {
            if(adjacencyMatrix[i][j] !== 0) {
                edgeList = [...edgeList, [adjacencyMatrix[i][j], i, j]];
            }
        }
    }
    return edgeList;
}
/**
 * 
 * @param {Array<Number>} vertexList: vertex list 
 * @param {Array<Array<Number>>} adjacencyMatrix: adjacency matrix, use 0
 * @param {Boolean} minimize
 * @typedef {Object} Result
 * @property {Array<Array<number>>} result: edges that are part of the MST
 * @property {Number} cost: total cost of the MST
 */
export const kruskal = (vertexList, adjacencyMatrix, minimize) => {
    // init
    let result = [];
    let mstCost = 0;
    let uf = new UnionFind(vertexList.length); // all vertexes are disjoint sets
    const edgeList = adjacencyMatrixToEdgeList(adjacencyMatrix);
    
    if(minimize) {
        // sort edges by weight
        edgeList.sort((a, b) => {
            return a[0] - b[0];
        });
    } else {
        edgeList.sort((a, b) => {
            return b[0] - a[0];
        });
    }
    // for each edge
    for(let i = 0; i < edgeList.length; i++) {
        let front = edgeList[i];
        if(!uf.isSameSet(front[1], front[2])) { // check if they are already on the same set
            mstCost += front[0];
            uf.unionSet(front[1], front[2]);
            result = [...result, [front[1], front[2]]];
        }
    }

    return { 
        result,
        cost: mstCost
    }
};