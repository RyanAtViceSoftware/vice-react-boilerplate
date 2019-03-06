import React from "react";
import wizard from "../../../modules/wizard";

const { components: Wizard } = wizard;

const WizardPageOne = ({ passedInData }) => <h1>Page 1 {passedInData}</h1>;
const WizardPageTwo = () => <h1>Page 2</h1>;

const WizardExampleContainer = () => (
  <div>
    <h1>Authenticated Page</h1>
    <Wizard
      pages={[
        {
          component: WizardPageOne,
          props: { passedInData: "Some passed in text" },
          title: "Step 1: Page 1 Title"
        },
        {
          component: WizardPageTwo,
          title: "Step 2: Page 2 Title"
        }
      ]}
    />
  </div>
);

export default WizardExampleContainer;
