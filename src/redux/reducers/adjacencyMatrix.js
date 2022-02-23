const initialState = {
    matrix: [],
    labels: [],
    display: false
};

const adjacencyMatrixReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ADJACENCY_MATRIX":
            return {
                ...state,
                matrix: action.data
            };
        case "SET_MATRIX_LABELS":
            return {
                ...state,
                labels: action.data
            };
        case "SET_MATRIX_DISPLAY":
            return {
                ...state,
                display: action.data
            }
        default:
            return state;
    }
};

export default adjacencyMatrixReducer;
