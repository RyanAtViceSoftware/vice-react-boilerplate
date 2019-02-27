import React from "react";
import { Provider } from "react-redux";
import sinon from "sinon";
import createHistory from "history/createBrowserHistory";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";
import Enzyme, { mount } from "enzyme";
import { push } from "react-router-redux";
import http from "../../modules/http";
import { createStore } from "../../modules/store";
import rootReducer from "../../modules/rootReducer";
import app from "../../modules/app";

const { App } = app.components;

describe("Given we are on Sign In page ", () => {
  describe("When we enter a correct user name and password and click submit ", () => {
    it("Then we POST the user name and password to /user-context", () => {
      Enzyme.configure({ adapter: new Adapter() });

      const history = createHistory();

      const httpMock = sinon.mock(http);

      const dummyUserName = "ryan";
      const dummyPassword = "password";
      const expectedGetBody = {
        userName: dummyUserName,
        password: dummyPassword
      };

      httpMock
        .expects("get")
        .withArgs("user-context", expectedGetBody, sinon.match.any)
        .once();

      const store = createStore(rootReducer, history);

      const wrapper = mount(
        <Provider store={store}>
          <App history={history} />
        </Provider>
      );

      expect(wrapper).to.be.ok;

      console.log("Wiring up dispatch...");

      const oldDispatch = store.dispatch;

      store.dispatch = function(a) {
        console.log("Dispatched: " + JSON.stringify(a));
        oldDispatch(a);
      };

      store.dispatch(push("/sign-in"));

      wrapper.update();

      const userNameTextBox = wrapper.find("input#userNameTextBox");

      const passwordTextBox = wrapper.find("input#passwordTextBox");

      const signInSubmitButton = wrapper.find("form");

      expect(userNameTextBox).to.be.ok;
      expect(userNameTextBox.getElements()).to.be.ok;
      expect(userNameTextBox.getElements().length).to.equal(1);

      expect(passwordTextBox).to.be.ok;
      expect(passwordTextBox.getElements()).to.be.ok;
      expect(passwordTextBox.getElements().length).to.equal(1);

      expect(signInSubmitButton).to.be.ok;
      expect(signInSubmitButton.getElements()).to.be.ok;
      expect(signInSubmitButton.getElements().length).to.equal(1);

      userNameTextBox.simulate("change", { target: { value: dummyUserName } });
      expect(userNameTextBox.instance().value).to.equal(dummyUserName);

      passwordTextBox.simulate("change", { target: { value: dummyPassword } });
      expect(passwordTextBox.instance().value).to.equal(dummyPassword);

      signInSubmitButton.simulate("submit");

      httpMock.verify();
      httpMock.restore();
    });
  });
});
