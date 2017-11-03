import React, {Component} from 'react';
import {connect} from 'react-redux';
import userContext from '../../userContext';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import home from '../../../screens/home';
import login from '../../../screens/login';
import busyIndicator from '../../busyIndicator';

const {getUserContext} = userContext.selectors;
const {BusyIndicator} = busyIndicator.components;
const {Home} = home.components;
const {Login} = login.components;
const {isBusy} = busyIndicator.selectors;

class App extends Component {
  componentDidMount() {
    this.props.login('ryanvice', 'fooBar');
  }

  render() {
    return (
      <Router>
        <div>
          <header>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/sign-in">Sign In</Link></li>
            </ul>
          </header>
          <div className="App-intro">
            { this.props.isBusy ? <BusyIndicator/> :
              <div>
                <Route exact path="/" component={Home}/>
                <Route path="/sign-in" component={Login}/>
              </div>
            }
          </div>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  login: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  ...userContext.actions
};

const mapStateToProps = state => ({
  userContext: getUserContext(state),
  isBusy: isBusy(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);