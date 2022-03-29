export const generateMatrix = (elements) => {
    if(!elements) {
        throw new Error("");
    }

    const {nodes, edges} = elements;

    const indexes = new Map();
    const adjacencyMatrix = [];

    nodes.forEach((node, index) => {
        indexes.set(node.data.id, index);
        adjacencyMatrix.push([]);
        for(let i = 0; i < nodes.length; i++) {
            adjacencyMatrix[index].push(-1);
        }
    });

    if(edges !== undefined) {
        edges.forEach(edge => {
            const { source, target, weight } = edge.data;
            const sourceIndex = indexes.get(source);
            const targetIndex = indexes.get(target);
            adjacencyMatrix[sourceIndex][targetIndex] = weight;
        });
    }

    return {
        adjacencyMatrix,
        indexes: Array.from(indexes)
    }
};
