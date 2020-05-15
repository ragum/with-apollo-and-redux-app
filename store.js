import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './redux/cartReducer';

export const initializeStore = () => {
    const middlewares = applyMiddleware(reduxLogger);
    const reducers = combineReducers({cartReducer});
    return createStore(reducers, composeWithDevTools(middlewares));
}