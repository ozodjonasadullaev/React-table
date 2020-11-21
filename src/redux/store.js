import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import TableReducer from './tableReducer';

const middleware = [thunk];

const store = createStore(
    TableReducer,

    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
