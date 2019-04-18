import React from "react";
import Documentation from "./Documentation";
import wizard from "../../../../modules/wizard";

const {
  components: { WizardPage }
} = wizard;

const simplePageMarkDown = `This is a simple page that allows creating pages that contain simple things like just text or images.

  \`\`\`js
          <Wizard
            pages={[
              {
                component: SimplePage,
                title: "Step 1: Simple page"
              },
            ]}/>
            
  \`\`\`
  `;

const SimplePage = () => (
  <WizardPage>
    <Documentation markdown={simplePageMarkDown} />
  </WizardPage>
);

export default SimplePage;
