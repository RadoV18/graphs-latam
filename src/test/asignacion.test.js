import { asignacion } from "../utils/algorithms/asignacion";

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
        expect(asignacion(matrix, false)).toBeOneOf([
            [[0, 0], [1, 1], [0, 2], [3, 3]],
            [[0, 0], [1, 1], [2, 2], [3, 3]],
            [[2, 0], [1, 1], [0, 2], [3, 3]],
            [[2, 0], [1, 1], [2, 2], [3, 3]]
        ])
    });

    test("maximizar matriz", () => {
        expect(asignacion(maxMatrix, true)).toEqual([
            [ [0, 0], [1, 3], [2, 1], [3, 2]]
        ]);
    });
});
