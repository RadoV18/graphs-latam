const initialState = [{
    container: document.getElementById("cy"),
    style: [
        {
            selector: "node",
            style: {
                label: "data(id)",
                "text-valign": "center",
                "text-halign": "center",
            },
        },
        {
            selector: "edge",
            style: {
                label: "data(weight)",
                "target-arrow-shape": "triangle",
                "target-arrow-color": "black",
                "source-arrow-color": "black",
                "line-color": "#333",
                width: 1.5,
                "curve-style": "bezier",
            },
        },
    ],
}];

const cytoscapeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_STATE":
            return [...state.slice(0, action.data.index + 1), action.data.obj];
        default:
            return state;
    }
};

export default cytoscapeReducer;
