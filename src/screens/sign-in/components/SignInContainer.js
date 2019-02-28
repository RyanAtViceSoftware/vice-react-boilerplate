import React from "react";
import { connect } from "react-redux";
import userContext from "../../../modules/userContext";
import SignIn from "./SignIn";
import { getSignInFormValues } from "../signIn.selectors";

const { isAuthenticated } = userContext.selectors;

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.signIn(values.email, values.password);
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { isAuthenticated } = this.props;

    return (
      <SignIn
        onSubmit={this.handleSubmit}
        isAuthenticated={isAuthenticated}
        from={from}
      />
    );
  }
}

const mapDispatchToProps = {
  signIn: userContext.actions.signIn
};

const mapStateToProps = state => ({
  signInFormValues: getSignInFormValues(state),
  isAuthenticated: isAuthenticated(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
