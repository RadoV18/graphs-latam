const edgeIdsReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_EDGE_ID":
            return [...state, action.data];
        default:
            return state;
    }
}

export default edgeIdsReducer;