export const addState = (obj, index) => {
    return {
        type: "ADD_STATE",
        data: {
            obj,
            index
        }
    }
}

export const importState = (obj) => {
    return {
        type: "IMPORT_STATE",
        data: {
            obj
        }
    }
}
