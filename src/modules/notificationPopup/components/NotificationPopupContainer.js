import React from "react";
import { connect } from "react-redux";
import "./notificationPopup.css";
import * as actions from "../notificationPopup.actions";
import { getError } from "../notificationPopup.selectors";

class NotificationPopupContainer extends React.Component {
  render() {
    const { errorMessage, closePopup } = this.props;

    return (
      <div>
        {errorMessage && (
          <div className="errorBox">
            <span
              className="closebtn"
              onClick={() => closePopup()}
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
            >
              &times;
            </span>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...getError(state)
});

const mapDispatchToProps = {
  closePopup: actions.closePopup
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationPopupContainer);
