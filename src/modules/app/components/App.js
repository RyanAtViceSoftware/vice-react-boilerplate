import React, {Component} from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import userContext from '../../userContext';
import busyIndicator from '../../busyIndicator';
import PropTypes from 'prop-types';

const {getUserContext} = userContext.selectors;
const {BusyIndicator} = busyIndicator.components;

class App extends Component {
  componentDidMount() {
    this.props.login('ryanvice', 'fooBar');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <BusyIndicator>
            <h1>Hi { this.props.userContext.displayName }</h1>
          </BusyIndicator>
        </div>
      </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);