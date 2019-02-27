import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { OnUpdate } from "rrc";
import userContext from "../../userContext";
import home from "../../../screens/home";
import signin from "../../../screens/sign-in";
import protectedRoute from "../../../screens/protected";
import authenticated from "../../../screens/authenticated";
import busyIndicator from "../../busyIndicator";
import error from "../../error";

const { getUserContext } = userContext.selectors;
const { BusyIndicator } = busyIndicator.components;
const { Home } = home.components;
const { SignIn } = signin.components;
const { Protected } = protectedRoute.components;
const { Authenticated } = authenticated.components;
const { isBusy } = busyIndicator.selectors;
const { Error } = error.components;

class App extends Component {
  render() {
    const { isBusy, history } = this.props;

    return (
      <ConnectedRouter history={history}>
        <div>
          <header>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/authenticated">Authenticated</Link>
              </li>
              <li>
                <Link to="/protected">Protected</Link>
              </li>
              <li>
                <Link to="/sign-in">Sign In</Link>
              </li>
            </ul>
          </header>
          <div className="App-intro">
            {isBusy ? (
              <BusyIndicator />
            ) : (
              <div>
                <OnUpdate call={this.props.resetError} />
                <Error />
                <Route exact path="/" component={Home} />
                <Route exact path="/authenticated" component={Authenticated} />
                <Route exact path="/protected" component={Protected} />
                <Route path="/sign-in" component={SignIn} />
              </div>
            )}
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  isBusy: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  resetError: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  ...error.actions
};

const mapStateToProps = state => ({
  userContext: getUserContext(state),
  isBusy: isBusy(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
