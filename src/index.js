import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import "./index.css";
import rootReducer from "./modules/rootReducer";
import registerServiceWorker from "./registerServiceWorker";
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

registerServiceWorker();
