import React, { Component } from "react";
import { connect } from "react-redux";
// import { reduxForm, Field } from "redux-form";
import wizard from "../../../modules/wizard";

const {
  components: { Wizard, WizardPage },
  constants: { wizardStates },
  selectors: { getWizardState }
} = wizard;

const PageOne = ({ passedInData }) => (
  <WizardPage>
    <h1>Page 1 {passedInData}</h1>
  </WizardPage>
);

const PageTwo = () => (
  <WizardPage>
    <h1>Page 2</h1>
  </WizardPage>
);

class WizardExampleContainer extends Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.wizard.currentState !== wizardStates.DISPOSING &&
      this.props.wizard.currentState === wizardStates.DISPOSING
    ) {
      // This is where you can clean up call back references, release
      // handles, etc...
      alert("Wizard is disposing, clean up here...");
    }

    if (
      prevProps.wizard.currentState !== wizardStates.DONE &&
      this.props.wizard.currentState === wizardStates.DONE
    ) {
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
        <h1>Authenticated Page</h1>
        <Wizard
          pages={[
            {
              component: PageOne,
              props: { passedInData: "Some passed in text" },
              title: "Step 1: Page 1 Title"
            },
            {
              component: PageTwo,
              title: "Step 2: Page 2 Title"
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
