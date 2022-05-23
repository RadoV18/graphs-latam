import Pair from './Pair';
import PriorityQueue from './PriorityQueue';
/**
 * 
 * @param {Array<Number>} vertexList: vertex list 
 * @param {Array<Array<Number>>} adjacencyMatrix: adjacency matrix, use Infinity
 * @param {Number} source: source node
 * 
 * @typedef {Object} Result
 * @property {Map<Number, Number>} dist - distances from source node.
 * @property {Map<Number, Number>} parents - parents of each node.
 * 
 */
export const dijkstra = (vertexList, adjacencyMatrix, source, minimize) => {
    // init
    const dist = new Map(); // distances from source
    const parents = new Map();
    vertexList.forEach(e => {
        if(minimize) {
            dist.set(e, Infinity)
        } else {
            dist.set(e, -Infinity)
        }
        parents.set(e, "");
    });
    dist.set(source, 0);
    parents.set(source, source);
    
    
    let pq = new PriorityQueue();
    pq.push(new Pair(0, source)); // base case
    while(!pq.empty()) {
        let front = pq.pop();
        let d = front.first; // distance from source
        let u = front.second; // vertex
        
        if(d <= dist.get(u)) { // lazy deletion
            for(let j = 0; j < adjacencyMatrix[u].length; j++) {
                if(adjacencyMatrix[u][j] !== 0) {
                    let v = new Pair(vertexList[j], adjacencyMatrix[u][j]);
                    if(minimize) {
                        if(dist.get(u) + v.second < dist.get(v.first)) {
                            dist.set(v.first, dist.get(u) + v.second);
                            parents.set(vertexList[j], u);
                            pq.push(new Pair(dist.get(u) + v.second, v.first));
                        }
                    } else {
                        if(dist.get(u) + v.second > dist.get(v.first)) {
                            dist.set(v.first, dist.get(u) + v.second);
                            parents.set(vertexList[j], u);
                            pq.push(new Pair(dist.get(u) + v.second, v.first));
                        }
                    }
                    
                }
            }
        }
    }
    return {
        dist,
        parents
    };
}