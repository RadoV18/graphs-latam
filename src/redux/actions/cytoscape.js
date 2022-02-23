export const addState = (obj, index) => {
    return {
        type: "ADD_STATE",
        data: {
            obj,
            index
        }
    }
}
