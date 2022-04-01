import { asignacionAlgorithm } from "../utils/algorithms/asignacion";

const matrix = [
    [3, 5, 7, 9],
    [2, 3, 6, 8],
    [1, 9, 5, 10],
    [2, 40, 12, 1],
];

const maxMatrix = [
    [38, 39, 30, 40],
    [15, 25, 28, 50],
    [34, 38, 29, 40],
    [21, 20, 35, 40],
];

describe("algoritmo de asignacion", () => {
    test("minimizar matriz", () => {
        expect(asignacionAlgorithm(matrix, false)).toEqual([
            [
                [0, 0],
                [2, 2],
                [3, 3],
                [1, 1],
            ],
            [
                [3, 3],
                [0, 2],
                [1, 1],
                [2, 0],
            ],
        ]);
    });

    test("maximizar matriz", () => {
        expect(asignacionAlgorithm(maxMatrix, true)).toEqual([
            [
                [0, 0],
                [3, 2],
                [1, 3],
                [2, 1],
            ],
        ]);
    });
});
