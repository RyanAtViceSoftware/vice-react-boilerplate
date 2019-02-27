import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  isAuthenticated,
  currentUserHasPermissions
} from "../userContext.selectors";

const WithRestrictedAccess = (WrappedComponent, requiredPermissions = []) => {
  const curriedCurrentUserHasPermissions = currentUserHasPermissions.bind(
    null,
    requiredPermissions
  );

  const ProtectedContainer = ({
    isAuthenticated,
    location,
    hasPermissions
  }) => (
    <div>
      {isAuthenticated && hasPermissions ? (
        <WrappedComponent />
      ) : // Authenticated so show content
      !isAuthenticated ? (
        <Redirect
          to={{
            // Not authenticated so redirect to /sign-in
            pathname: "/sign-in",
            state: { from: location }
          }}
        />
      ) : (
        <div>You {"don't"} have the required permissions for this page.</div>
      )}
    </div>
  );

  ProtectedContainer.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    hasPermissions: PropTypes.bool.isRequired
  };

  const mapStateToProps = state => ({
    isAuthenticated: !!isAuthenticated(state),
    hasPermissions: curriedCurrentUserHasPermissions(state)
  });

  return connect(mapStateToProps)(ProtectedContainer);
};

export default WithRestrictedAccess;
