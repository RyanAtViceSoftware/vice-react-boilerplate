import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastr";
import "./error.css";
import { getError } from "../notificationPopup.selectors";

class ErrorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.notificationContainer = { ref: null };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.errorMessage &&
      nextProps.errorMessage !== this.props.errorMessage
    ) {
      this.notificationContainer.ref.error(nextProps.errorMessage, ``, {
        closeButton: true,
        showAnimation: "animated fadeIn",
        hideAnimation: "animated fadeOut"
      });

      this.props.logErrorOnServer(
        `Route: ${window.location.href}. Error: ${nextProps.errorMessage}`
      );
    }

    if (
      nextProps.successMessage &&
      nextProps.successMessage !== this.props.successMessage
    ) {
      const defaultConfig = {
        closeButton: true,
        showAnimation: "animated fadeIn",
        hideAnimation: "animated fadeOut"
      };

      this.notificationContainer.ref.success(nextProps.successMessage, ``, {
        ...defaultConfig,
        ...nextProps.config
      });
    }
  }

  render() {
    return (
      <ToastContainer
        ref={ref => (this.notificationContainer.ref = ref)}
        className="toast-top-right"
      />
    );
  }
}

ErrorContainer.propTypes = {
  errorMessage: PropTypes.string
};

const mapDispatchToProps = {
  logErrorOnServer
};

const mapStateToProps = state => ({
  ...getError(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorContainer);
