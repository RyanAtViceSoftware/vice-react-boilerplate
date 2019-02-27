import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getErrorMessage } from "../error.selectors";
import Error from "./Error";

const ErrorContainer = ({ errorMessage }) => (
  <Error errorMessage={errorMessage} />
);

ErrorContainer.propTypes = {
  errorMessage: PropTypes.string
};

const mapStateToProps = state => ({
  errorMessage: getErrorMessage(state)
});

export default connect(mapStateToProps)(ErrorContainer);
