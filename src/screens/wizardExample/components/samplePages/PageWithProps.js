import React from "react";
import Documentation from "./Documentation";
import wizard from "../../../../modules/wizard";

const {
  components: { WizardPage }
} = wizard;

const docs = `
This sample shows how to pass in props from the \`Wizard\` to \`WizardPage\` components
\`\`\`js
        <Wizard
          pages={[
            {
              component: PageWithProps,
              props: { passedInData: "Some passed in text" },
              title: "Step 2: Page with Props"
            }
          ]}/>
          
\`\`\`
`;

const PageWithProps = ({ passedInData }) => (
  <WizardPage>
    <p>You passed in {passedInData} via props</p>
    <Documentation markdown={docs} />
  </WizardPage>
);

export default PageWithProps;
