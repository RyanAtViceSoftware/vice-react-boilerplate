import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import rootReducer from './modules/rootReducer';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from './modules/store';
import app from './modules/app';

const { App } = app.components;

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
