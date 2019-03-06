import React from "react";
import ValidatingReduxFormWizardPageContainer from "./ValidatingReduxFormWizardPageContainer";

const WithReduxFormWizardPageValidation = (
  wrappedComponent,
  { formName, componentProps, handlesValidation, requiresInitialization = true }
) => props => (
  <ValidatingReduxFormWizardPageContainer
    component={wrappedComponent}
    formName={formName}
    handlesValidation={handlesValidation}
    requiresInitialization={requiresInitialization}
    {...componentProps}
    {...props}
  />
);

export default WithReduxFormWizardPageValidation;
