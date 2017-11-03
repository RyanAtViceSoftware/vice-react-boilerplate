import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import userContext from '../../../modules/userContext';

const {getUserContext} = userContext.selectors;

class HomeContainer extends Component {
  render() {
    return (
      <h1>Hi { this.props.userContext.displayName }</h1>
    );
  }
}

HomeContainer.propTypes = {
  userContext: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  ...userContext.actions
};

const mapStateToProps = state => ({
  userContext: getUserContext(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);