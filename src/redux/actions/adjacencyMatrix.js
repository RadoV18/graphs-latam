export const setAdjacencyMatrix = (data) => {
    return {
        type: "SET_ADJACENCY_MATRIX",
        data
    }
};

export const setMatrixLabels = (data) => {
    return {
        type: "SET_MATRIX_LABELS",
        data
    }
};

export const setMatrixDisplay = (data) => {
    return {
        type: "SET_MATRIX_DISPLAY",
        data
    }
}