import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import cytoscapeReducer from "./reducers/cytoscape";
import toolbarReducer from "./reducers/toolbar";
import edgeCreatorReducer from "./reducers/edgeCreator";
import edgeIdsReducer from "./reducers/edgeIds";
import textInputReducer from "./reducers/textInput";
import modalStyleReducer from "./reducers/modalStyle";
import nodeCreatorReducer from "./reducers/nodeCreator";

const reducer = combineReducers({
    cytoscapeData: cytoscapeReducer,
    toolbar: toolbarReducer,
    edgeCreator: edgeCreatorReducer,
    edgeIds: edgeIdsReducer,
    textInput: textInputReducer,
    modalStyle: modalStyleReducer,
    nodeCreator: nodeCreatorReducer
});

const store = createStore(reducer, composeWithDevTools());

export default store;