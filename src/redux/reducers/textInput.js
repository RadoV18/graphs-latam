const textInputReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_TEXT":
            return action.data;
        default:
            return state
    }
}

export default textInputReducer;