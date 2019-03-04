import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import userContext from "../../../modules/userContext";

const { getUserContext, isAuthenticated } = userContext.selectors;

class HomeContainer extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>
        {!isAuthenticated ? (
          <div>
            <h1>Welcome Guest</h1>
            <p>
              You can login as ryan@vicesoftware.com with {"'password'"} for
              your password.
            </p>
          </div>
        ) : (
          <h1>Hi {this.props.userContext.displayName}</h1>
        )}
      </div>
    );
  }
}

HomeContainer.propTypes = {
  userContext: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapDispatchToProps = {
  ...userContext.actions
};

const mapStateToProps = state => ({
  userContext: getUserContext(state),
  isAuthenticated: isAuthenticated(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
