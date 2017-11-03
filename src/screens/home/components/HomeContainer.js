import React, {Component} from 'react';
import {connect} from 'react-redux';
import userContext from '../../../modules/userContext';

const {getUserContext} = userContext.selectors;

class HomeContainer extends Component {
  componentDidMount() {
    this.props.login('ryanvice', 'fooBar');
  }

  render() {
    return (
      <h1>Hi { this.props.userContext.displayName }</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);