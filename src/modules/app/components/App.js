import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route } from "react-router-dom";
import { OnUpdate } from "rrc";
import userContext from "../../userContext";
import home from "../../../screens/home";
import signin from "../../../screens/sign-in";
import protectedRoute from "../../../screens/protected";
import authenticated from "../../../screens/authenticated";
import wizardExample from "../../../screens/wizardExample";
import busyIndicator from "../../busyIndicator";
import notificationPopup from "../../notificationPopup";
import "./app.css";
import navBar from "../../navBar";

const { BusyIndicator } = busyIndicator.components;
const { Home } = home.components;
const { SignIn } = signin.components;
const { Protected } = protectedRoute.components;
const { Authenticated } = authenticated.components;
const { WizardExample } = wizardExample.components;
const { NotificationPopup } = notificationPopup.components;
const {
  selectors: { getUserContext }
} = userContext;
const {
  selectors: { isBusy }
} = busyIndicator;
const {
  components: { NavBar, MenuItem }
} = navBar;

class App extends Component {
  render() {
    const { isBusy, history } = this.props;

    return (
      <Router history={history}>
        <div>
          <NavBar>
            <MenuItem to="/">Home</MenuItem>
            <MenuItem to="/authenticated">Authenticated</MenuItem>
            <MenuItem to="/protected">Protected</MenuItem>
            <MenuItem to="/wizard-example">Wizard Example</MenuItem>
            <MenuItem to="/sign-in">Sign In</MenuItem>
          </NavBar>
          <div className="App-intro">
            <NotificationPopup />
            {isBusy ? (
              <BusyIndicator />
            ) : (
              <div>
                <OnUpdate call={this.props.resetError} />
                <Route exact path="/" component={Home} />
                <Route exact path="/authenticated" component={Authenticated} />
                <Route exact path="/protected" component={Protected} />
                <Route exact path="/wizard-example" component={WizardExample} />
                <Route path="/sign-in" component={SignIn} />
              </div>
            )}
          </div>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = {
  resetError: notificationPopup.actions.resetError
};

const mapStateToProps = state => ({
  userContext: getUserContext(state),
  isBusy: isBusy(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
