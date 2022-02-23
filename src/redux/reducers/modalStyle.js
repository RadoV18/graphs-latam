const initialState = {
    display: "none"
};


const modalStyleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DISPLAY":
            return {
                ...state,
                display: action.data
            }
        default:
            return state;
    }
};

export default modalStyleReducer;