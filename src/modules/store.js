import {
  createStore as reduxCreateStore,
  applyMiddleware,
  compose
} from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";

const reduxImmutableStateInvariant = require("redux-immutable-state-invariant").default();

let store;

export const createStore = (rootReducer, history, initialState) => {
  const routerMiddlewareWithHistory = routerMiddleware(history);
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const middleware = [routerMiddlewareWithHistory, thunk];

  if (process.env.NODE_ENV !== "production") {
    middleware.push(reduxImmutableStateInvariant);
  }

  const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
    // other store enhancers if any
  );

  store = reduxCreateStore(rootReducer, initialState, enhancer);

  return store;
};

//  Allows access to store.dispatch outside of connected components (e.g. action creators)
export const dispatch = action => store.dispatch(action);

// Allows access to store.dispatch outside of connected components (e.g. action creators)
export const getState = () => store.getState();
