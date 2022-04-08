const initialState = [
    {
        container: document.getElementById("cy"),
        style: [
            {
                selector: "node",
                css: {
                    label: "data(id)",
                    "text-valign": "center",
                    "text-halign": "center",
                    "background-color": "white",
                    color: "black",
                    "border-opacity": "1",
                    "border-width": "2px",
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
                    "text-rotation": "autorotate",
                    "text-margin-y": "-10px",
                },
            },
        ],
        zoomingEnabled: false,
        userZoomingEnabled: false,
        panningEnabled: false,
        userPanningEnabled: false,
    },
];

const cytoscapeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_STATE":
            return [...state.slice(0, action.data.index + 1), action.data.obj];
        case "IMPORT_STATE":
            return [action.data.obj];
        default:
            return state;
    }
};

export default cytoscapeReducer;
