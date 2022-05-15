import { dijkstra } from "../utils/graphs/dijkstra";

describe("dijkstra's algorithm", function() {
    test("test 1", () => {
        const vertexList = [0, 1, 2, 3, 4];
        
        const adjacencyMatrix = [
            [0, 0, 0, 0, 1],
            [0, 0, 0, 3, 6],
            [6, 2, 0, 7, 0],
            [0, 0, 0, 0, 5],
            [0, 0, 0, 0, 0]
        ]
        const source = 2;
        expect(dijkstra(vertexList, adjacencyMatrix, source)).toEqual(
            {
                dist: new Map([
                    [0, 6],
                    [1, 2],
                    [2, 0],
                    [3, 5],
                    [4, 7]
                ]),
                parents: new Map([
                    [0, 2],
                    [1, 2],
                    [2, 2],
                    [3, 1],
                    [4, 0]
                ])
            }
        );
    });
});