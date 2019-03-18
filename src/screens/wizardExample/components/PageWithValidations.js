import React, { Component } from "react";
import { connect } from "react-redux";
import wizard from "../../../modules/wizard";

const {
  components: { ValidatingWizardPage },
  selectors: { validationRequested, getWizardState }
} = wizard;

class PageWithValidationLogic extends Component {
  state = {
    isValid: false
  };

  componentDidUpdate(prevProps) {
    if (validationRequested(prevProps, this.props)) {
      alert("Here we would do validations");

      if (this.state.isValid) {
        alert("We are valid");
        // We call the pageValid action to let the wizard know we are valid
        this.props.pageValid();
      } else {
        alert("We aren't valid");
        // We call the pageNotValid action to let the wizard know we aren't valid
        this.props.pageNotValid();
      }
    }
  }

  render() {
    return (
      <ValidatingWizardPage>
        <p>Page 2</p>
        <button onClick={() => this.setState({ isValid: true })}>
          we are valid
        </button>
      </ValidatingWizardPage>
    );
  }
}

const mapStateToProps = state => ({
  wizard: getWizardState(state)
});

const mapDispatchToProps = {
  pageValid: wizard.actions.pageValid,
  pageNotValid: wizard.actions.pageNotValid
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageWithValidationLogic);
