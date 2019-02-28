import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Register from "./Register";
import userContext from "../../../modules/userContext";

class RegisterContainer extends React.Component {
  handleSubmit = values => {
    const { history, updateUserContext } = this.props;

    updateUserContext(values);

    history.push("/account");
  };

  render() {
    return (
      <Register onSubmit={this.handleSubmit} push={this.props.history.push} />
    );
  }
}

const mapDispatchToProps = {
  updateUserContext: userContext.actions.updateUserContext
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(RegisterContainer)
);
