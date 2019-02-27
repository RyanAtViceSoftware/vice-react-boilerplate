import React from "react";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import { createStore } from "../store";
import rootReducer from "../rootReducer";
import ReactDOM from "react-dom";
import App from "./components/App";

it("renders without crashing", () => {
  const history = createHistory();
  const store = createStore(rootReducer, history);
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    div
  );
});
