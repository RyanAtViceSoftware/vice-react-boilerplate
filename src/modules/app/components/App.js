import React, { Component } from 'react';
import { connect } from 'react-redux';
import userContext from '../../userContext';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { OnUpdate } from 'rrc';
import home from '../../../screens/home';
import signin from '../../../screens/sign-in';
import protectedRoute from '../../../screens/protected-route';
import busyIndicator from '../../busyIndicator';
import error from '../../error';

const { getUserContext } = userContext.selectors;
const { BusyIndicator } = busyIndicator.components;
const { Home } = home.components;
const { SignIn } = signin.components;
const { Protected } = protectedRoute.components;
const { isBusy } = busyIndicator.selectors;
const { Error } = error.components;

class App extends Component {
  render() {
    const { isBusy } = this.props;

    return (
      <Router>
        <div>
          <header>
            <ul>
              <li>
                <Link to="/">Home</Link>
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
                <Route exact path="/protected" component={Protected} />
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
  ...error.actions
};

const mapStateToProps = state => ({
  userContext: getUserContext(state),
  isBusy: isBusy(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
