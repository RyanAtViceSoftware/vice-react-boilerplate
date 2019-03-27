import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import "./index.css";
import rootReducer from "./modules/rootReducer";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "./modules/store";
import app from "./modules/app";

const { App } = app.components;

const history = createHistory();

const store = createStore(rootReducer, history);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
