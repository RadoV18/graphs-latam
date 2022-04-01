import { northWestAlgorithm } from "../utils/algorithms/northWestAlgorithm";
//  (matrix, avaliable, demand, optim)

const matrix1 = [
    [2, 2, 4, 7],
    [5, 1, 1, 1],
    [4, 6, 2, 1],
];

const matrix2 = [
    [2, 2, 4, 7],
    [5, 1, 1, 1],
    [4, 1, 2, 1],
];

const available = [5, 9, 5];
const demand = [2, 7, 7, 3];

describe("Algoritmo NorthWest algorithm", () => {
    test("fabricacion de cerveza en una solucion", () => {
        expect(northWestAlgorithm(matrix1, available, demand, false)).toEqual([
            [2, 3, 0, 0],
            [0, 4, 5, 0],
            [0, 0, 2, 3],
        ]);
    });
    test("fabricacion de cerveza (min)", () => {
        expect(northWestAlgorithm(matrix2, available, demand, false)).toEqual([
            [2, 3, 0, 0],
            [0, 2, 7, 0],
            [0, 2, 0, 3],
        ]);
    });
    test("fabricacion de cerveza (max)", () => {
        expect(northWestAlgorithm(matrix2, available, demand, true)).toEqual([
            [2, 0, 0, 3],
            [0, 7, 2, 0],
            [0, 0, 5, 0],
        ]);
    });
});
