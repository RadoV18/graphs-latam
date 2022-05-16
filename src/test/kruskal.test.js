import { kruskal } from "../utils/graphs/kruskal";

describe("kruskal's algorithm", () => {
    test("cp3 example", () => {
        const adjacencyMatrix = [
            [0, 4, 4, 6, 6],
            [4, 0, 2, 0, 0],
            [4, 2, 0, 8, 0],
            [6, 0, 8, 0, 9],
            [6, 0, 0, 9, 0],
        ];
        const vertexList = [0, 1, 2, 3, 4];
        expect(kruskal(vertexList, adjacencyMatrix)).toEqual(
            {
                cost: 18,
                result: [
                    [1, 2],
                    [0, 1],
                    [0, 3],
                    [0, 4]
                ]
            }
        );
    });
    test("con grafo dirigido", () => {
        const adjacencyMatrix = [
            [0, 4, 4, 6, 6],
            [0, 0, 2, 0, 0],
            [0, 0, 0, 8, 0],
            [0, 0, 0, 0, 9],
            [0, 0, 0, 0, 0],
        ];
        const vertexList = [0, 1, 2, 3, 4];
        expect(kruskal(vertexList, adjacencyMatrix)).toEqual(
            {
                cost: 18,
                result: [
                    [1, 2],
                    [0, 1],
                    [0, 3],
                    [0, 4]
                ]
            }
        );
    });
    test("grafo dirigido inv", () => {
        const adjacencyMatrix = [
            [0, 0, 0, 0, 0],
            [4, 0, 0, 0, 0],
            [4, 2, 0, 0, 0],
            [6, 0, 8, 0, 0],
            [6, 0, 0, 9, 0],
        ];
        const vertexList = [0, 1, 2, 3, 4];
        expect(kruskal(vertexList, adjacencyMatrix)).toEqual(
            {
                cost: 18,
                result: [
                    [2, 1],
                    [1, 0],
                    [3, 0],
                    [4, 0]
                ]
            }
        );
    }); 
});