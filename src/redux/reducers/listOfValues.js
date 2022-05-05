
const listInputReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_LIST":
            return action.data;
        default:
            return state
    }
}

export default listInputReducer;