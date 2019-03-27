import React, { Component } from "react";
import { connect } from "react-redux";
import wizard from "../../../../modules/wizard";
import Documetation from "./Documentation";

const {
  constants: { wizardStates }
} = wizard;

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
        <Documetation markdown={getDocs()} />
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

function getDocs() {
  return `
This page demonstrates a page that requires initialization before the page becomes active.
A common scenario is if you need to load data from the server before the page is ready. 
This page simulates the loading of data using a settimeout in componentDidMount as shown below

\`\`\`js
  componentDidMount() {
    setTimeout(() => this.setState({ isInitialized: true }), 500);
  }
\`\`\`

We then configure our page to require initialization by setting the \`requiresInitialization\` on \`WizardPage\` as shown below.

\`\`\`js
      <WizardPage requiresInitialization>
        <Documetation markdown={getDocs()} />
      </WizardPage>
\`\`\`

We can then follow the pattern shown below to fire our initialization logic in \`componentDidUpdate\`.

\`\`\`js
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
\`\`\`

`;
}
