import React, { Component } from "react";
import { connect } from "react-redux";
import wizard from "../../../modules/wizard";
import PageWithValidations from "./samplePages/PageWithValidations";
import PageWithInitializations from "./samplePages/PageWithInitializations";
import PageWithReduxFormsValidations from "./samplePages/PageWithReduxFormsValidations";
import LastPageOfWizardWithReduxFormsValidations from "./samplePages/LastPageOfWizardWithReduxFormsValidations";
import PageWithProps from "./samplePages/PageWithProps";
import SimplePage from "./samplePages/SimplePage";
import Documetation from "./samplePages/Documentation";

const {
  components: { Wizard },
  selectors: { wizardIsDisposing, wizardIsDone, getWizardState },
  actions: { resetWizard }
} = wizard;

class WizardExampleContainer extends Component {
  state = {
    wizardIsDone: false
  };

  componentDidUpdate(prevProps) {
    if (wizardIsDisposing(prevProps, this.props)) {
      // This is where you can clean up call back references, release handles, etc...
      alert("Wizard is disposing, clean up here...");
    }

    if (wizardIsDone(prevProps, this.props)) {
      // Note that if you are using redux forms you will likely not use
      // this block and will instead use redux form's submit handler instead
      alert(
        "Wizard is done, do things that need to happen after wizard is done here..."
      );
    }
  }

  handleDone = () => {
    this.props.resetWizard();

    alert(
      "This is where we can handle things that need to happen after the wizard" +
        " is complete done and cleaned up."
    );

    this.setState({ wizardIsDone: true });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.wizardIsDone ? (
          <div>
            <Documetation markdown={getDocs()} />
            <button
              className="button"
              onClick={() => this.setState({ wizardIsDone: false })}
            >
              Restart
            </button>
          </div>
        ) : (
          <div className="wizard-container">
            <h1>Wizard Example</h1>
            <Wizard
              pages={[
                {
                  component: SimplePage,
                  title: "Step 1: Simple page"
                },
                {
                  component: PageWithProps,
                  props: { passedInData: "Some passed in text" },
                  title: "Step 2: Page with Props"
                },
                {
                  component: PageWithValidations,
                  title: "Step 3: Page Validation Logic"
                },
                {
                  component: PageWithInitializations,
                  title: "Step 4: Page with initializations"
                },
                {
                  component: PageWithReduxFormsValidations,
                  title: "Step 5: Page with redux forms validations",
                  props: { formName: "PageWithReduxFormsValidations" }
                },
                {
                  component: LastPageOfWizardWithReduxFormsValidations,
                  title: "Step 6: Last page with redux forms validations",
                  props: { formName: "PageWithReduxFormsValidations" }
                }
              ]}
              formName="PageWithReduxFormsValidations"
              onDone={this.handleDone}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  wizard: getWizardState(state)
});

const mapDispatchToProps = {
  resetWizard
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WizardExampleContainer);

function getDocs() {
  return `
Our wizard is now done. 

We were able to reset the wizard using the \`resetWizard\` action creator.

We were able to know this and hide the wizard by subscribing to the \`onDone\` callback as shown below.

\`\`\`js
handleDone = () => {
  alert(
    "This is where we can handle things that need to happen after the wizard" +
      " is complete done and cleaned up."
  );

  this.setState({ wizardIsDone: true });
};

render() {
  return (
    <React.Fragment>
      {this.state.wizardIsDone ? (
        <Documetation markdown={getDocs()} />
        <button
          className="button"
          onClick={() => this.setState({ wizardIsDone: false })}
        >
          Restart
        </button>
      ) : (
        <div className="wizard-container">
          <h1>Wizard Example</h1>
          <Wizard
            pages={[
              {
                component: SimplePage,
                title: "Step 1: Simple page"
              }
            ]}
            onDone={this.handleDone}
          />
        </div>
      )}
      </React.Fragment>
    );
  }
\`\`\`

`;
}
