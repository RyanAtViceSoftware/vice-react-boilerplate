import React from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Enzyme, { mount} from 'enzyme';
import { createStore } from '../../modules/store';
import rootReducer from '../../modules/rootReducer';
import app from '../../modules/app';

const { App } = app.components;

it('mounts and is ok', () => {
  Enzyme.configure({ adapter: new Adapter() })

  const history = createHistory();

  const store = createStore(rootReducer, history);

  const wrapper = mount(
    <Provider store={store}>
      <App history={history}/>
    </Provider>
  );

  expect(wrapper).to.be.ok;

  const signInLink = wrapper.find('[href="/sign-in"]');

  signInLink.simulate('click');

  // TODO: Figure out how to navigate in the tests when using
  // React Router
});

