import { createStore, combineReducers } from 'redux';
import nodesReducer from './reducers/nodesReducer';
import edgesReducer from './reducers/edgesReducer';

const rootReducer = combineReducers({
    nodes: nodesReducer,
    edges: edgesReducer,
});

const store = createStore(rootReducer);

export default store;
