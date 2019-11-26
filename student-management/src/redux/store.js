import { createStore, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';

// Register Reducer
import rootReducer from './reducers';

// Middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const myLogger = (store) => (next) => (action) => {
  console.log('Logged Action: ', action);
  next(action);
};


// Configuring store
const store = createStore (
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(myLogger, thunk))
);
export default store;