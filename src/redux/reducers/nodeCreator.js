const nodeCreatorReducer = (state = {}, action) => {
    switch(action.type) {
        case "SET_NEW_NODE_POSITION":
            return {
                ...state,
                position: action.data
            }
        default:
            return state;
    }
}

export default nodeCreatorReducer;