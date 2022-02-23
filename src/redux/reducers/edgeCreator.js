const initialState = {
    source: "",
    target: ""
};

const edgeCreatorReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_SOURCE_NODE":
            return {
                ...state,
                source: action.data
            }
        case "SET_TARGET_NODE":
            return {
                ...state,
                target: action.data
            }
        default:
            return state;
    }
}

export default edgeCreatorReducer;