import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import app from './modules/app';
import rootReducer from './rootReducer';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from './store';
// import { Router, Route, browserHistory } from 'react-router';

const { App } = app.components;

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
