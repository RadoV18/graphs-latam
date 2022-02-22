import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import cytoscapeReducer from "./reducers/cytoscape";
import toolbarReducer from "./reducers/toolbar";
import edgeCreatorReducer from "./reducers/edgeCreator";
import edgeIdsReducer from "./reducers/edgeIds";

const reducer = combineReducers({
    cytoscapeData: cytoscapeReducer,
    toolbar: toolbarReducer,
    edgeCreator: edgeCreatorReducer,
    edgeIds: edgeIdsReducer
});

const store = createStore(reducer, composeWithDevTools());

export default store;