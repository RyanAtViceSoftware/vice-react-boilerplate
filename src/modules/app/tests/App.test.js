import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../../store';
import rootReducer from '../../rootReducer';
import ReactDOM from 'react-dom';
import App from '../components/App';

it('renders without crashing', () => {
  const store = createStore(rootReducer);
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
