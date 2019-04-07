import React, { Component } from "react";
import { connect } from "react-redux";
import wizard from "../../../../modules/wizard";
import Documetation from "./Documentation";

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
        <button
          className="app-button"
          onClick={() => this.setState({ isValid: true })}
        >
          {this.state.isValid ? "Page is Valid" : "Validate Page"}
        </button>
        <Documetation markdown={getDocs()} />
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

function getDocs() {
  return `
This page demonstrates validation support. 
If you click the \`Next\` without clicking 
\`Validate Page\` button first the page won't progress. 
If however you click the \`Validate Page\` button then 
click the \`Next Button\` then you will be shown the next page. 

To create a simple validating page like this
1. Wrap your page component in a \`<ValidatingWizardPage/>\`
1. In your \`componentDidUpdate()\` use the selectors and actions shown 
implement your validation logic 
\`\`\`js
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
\`\`\`
`;
}
