import {
  createStore as reduxCreateStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';

let store;

export const createStore = (rootReducer, initialState) => {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const middleware = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(require('redux-immutable-state-invariant').default());
  }

  const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
    // other store enhancers if any
  );

  store = reduxCreateStore(rootReducer, initialState, enhancer);

  return store;
};

// Allows access to store.dispatch outside of connected components (e.g. action creators)
export const dispatch = () => {
  store.dispatch(arguments);
};

// Allows access to store.dispatch outside of connected components (e.g. action creators)
export const getState = () => {
  store.getState(arguments);
};
