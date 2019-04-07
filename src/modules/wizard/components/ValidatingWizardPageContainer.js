import React from "react";
import { connect } from "react-redux";
import WizardPage from "./WizardPageContainer";
import * as wizardActions from "../wizard.actions";
import { getWizardState, wizardStateChanged } from "../wizard.selectors";
import { wizardStates } from "../wizard.constants";

class ValidatingWizardPage extends React.Component {
  componentDidUpdate(prevProps) {
    if (wizardStateChanged(prevProps, this.props)) {
      this.transitionStateMachine(this.props);
    }
  }

  transitionStateMachine({ wizard, validating } = {}) {
    switch (wizard.currentState) {
      case wizardStates.DONE_REQUESTED:
      case wizardStates.VALIDATION_REQUESTED: {
        validating();
        break;
      }
      default: {
        break;
      }
    }
  }

  render() {
    return (
      <WizardPage requiresValidation {...this.props}>
        {this.props.children}
      </WizardPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    wizard: getWizardState(state)
  };
};

const mapDispatchToProps = {
  validating: wizardActions.validating
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidatingWizardPage);
