import React, { Component } from "react";
import { connect } from "react-redux";
import wizard from "../../../modules/wizard";
import { wizardStates } from "../../../modules/wizard/wizard.constants";

const {
  components: { WizardPage },
  selectors: { getWizardState }
} = wizard;

class PageWithValidationLogic extends Component {
  state = {
    isInitialized: false
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isInitialized: true }), 500);
  }

  componentDidUpdate(_, prevState) {
    if (this.props.wizard.currentState === wizardStates.INITIALIZING) {
      alert("Here we can check to see if we are don initializing");

      if (!prevState.isInitialized && this.state.isInitialized) {
        alert("We are initialized");
        // We call the initialized action to let the wizard know we are initialized
        this.props.initialized();
      } else {
        alert("We aren't initialized yet");
      }
    }
  }

  render() {
    return (
      <WizardPage requiresInitialization>
        <h1>Page with Initializations</h1>
      </WizardPage>
    );
  }
}

const mapStateToProps = state => ({
  wizard: getWizardState(state)
});

const mapDispatchToProps = {
  initialized: wizard.actions.initialized
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageWithValidationLogic);
