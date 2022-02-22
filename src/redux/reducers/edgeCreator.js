const initialState = {
    source: ""
};

const edgeCreatorReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_SOURCE_NODE":
            return {
                ...state,
                source: action.data
            }
        default:
            return state;
    }
}

export default edgeCreatorReducer;