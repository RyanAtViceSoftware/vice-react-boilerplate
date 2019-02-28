import React, { Component } from "react";
import { connect } from "react-redux";
import userContext from "../../../modules/userContext";
import Account from "./Account";
import "./account.css";

const {
  selectors: { getUserContext },
  components: { WithRestrictedAccess }
} = userContext;

class AccountContainer extends Component {
  render() {
    return <Account initialValues={this.props.initialValues} />;
  }
}

const mapStateToProps = state => ({
  initialValues: {
    ...getUserContext(state)
  }
});

export default WithRestrictedAccess(connect(mapStateToProps)(AccountContainer));
