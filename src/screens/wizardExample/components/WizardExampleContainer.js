import React, { Component } from "react";
import { connect } from "react-redux";
// import { reduxForm, Field } from "redux-form";
import wizard from "../../../modules/wizard";
import PageWithValidations from "./PageWithValidations";
import PageWithInitializations from "./PageWithInitializations";

const {
  components: { Wizard, WizardPage },
  selectors: { getWizardState, wizardIsDisposing, wizardIsDone }
} = wizard;

const PageWithProps = ({ passedInData }) => (
  <WizardPage>
    <p>Page 2 {passedInData}</p>
  </WizardPage>
);

const SimplePage = () => (
  <WizardPage>
    <p>Page 1</p>
  </WizardPage>
);

class WizardExampleContainer extends Component {
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

  render() {
    return (
      <div>
        <h1>Wizard Example</h1>
        <Wizard
          pages={[
            {
              component: SimplePage,
              title: "Step 1: Page with initializations"
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
            }
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wizard: getWizardState(state)
});

export default connect(mapStateToProps)(WizardExampleContainer);
