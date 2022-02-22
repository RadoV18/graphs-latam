const initialState = {
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
};

const cytoscapeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CYTOSCAPE":
            return action.data;
        case "SET_LAST_NODE_POSITION":
            return {
                ...state,
                elements: state.elements.map
            }
        default:
            return state;
    }
};

export default cytoscapeReducer;
