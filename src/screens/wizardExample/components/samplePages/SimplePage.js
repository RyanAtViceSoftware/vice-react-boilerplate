import React from "react";
import Documentation from "./Documentation";
import wizard from "../../../../modules/wizard";

const {
  components: { WizardPage }
} = wizard;

const simplePageMarkDown =
  "This is a simple page that allows creating pages that contain simple things like just text or images.";

const SimplePage = () => (
  <WizardPage>
    <Documentation markdown={simplePageMarkDown} />
  </WizardPage>
);

export default SimplePage;
