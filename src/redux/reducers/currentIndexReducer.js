const currentIndexReducer = (state = 0, action) => {
    switch (action.type) {
        case "NEXT_INDEX":
            return state + 1;
        case "PREV_INDEX":
            return state === 0 ? 0 : state - 1;
        case "RESET_INDEX":
            return 0;
        default:
            return state;
    }
}

export default currentIndexReducer;