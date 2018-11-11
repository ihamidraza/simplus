import { applyMiddleware, createStore } from "redux";
import { routerMiddleware }  from 'react-router-redux';
import thunk from "redux-thunk";

import reducers from '../reducers/rootReducer';

const configureStore = (history: {}) => {
  const middleWares = [thunk, routerMiddleware(history)];
  const middleware = applyMiddleware(...middleWares);

  return createStore(reducers, middleware);
}

export default configureStore;
