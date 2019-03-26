import React from "react";
import ValidatingReduxFormWizardPageContainer from "./ValidatingReduxFormWizardPageContainer";
import { reduxForm, SubmissionError } from "redux-form";
import _ from "lodash";
import { getWizardErrors } from "../wizard.selectors";
import { getState } from "../../store";

const WithReduxFormWizardPageValidation = (
  wrappedComponent,
  {
    formName,
    handlesValidation,
    requiresInitialization = false,
    isLastPage = false
  }
) => {
  let config;

  if (isLastPage) {
    config = {
      form: formName,
      destroyOnUnmount: false,
      forceUnregisterOnUnmount: true,
      keepDirtyOnReinitialize: true,
      enableReinitialize: true
    };
  } else {
    config = {
      form: formName,
      destroyOnUnmount: false,
      forceUnregisterOnUnmount: true,
      onSubmit: submit
    };
  }

  const page = reduxForm(config)(wrappedComponent);

  return props => (
    <ValidatingReduxFormWizardPageContainer
      formName={formName}
      handlesValidation={handlesValidation}
      requiresInitialization={requiresInitialization}
      {...props}
    >
      {React.createElement(page, props)}
    </ValidatingReduxFormWizardPageContainer>
  );
};

// values left so we know it's available
function submit() {
  // We can do form level validations here if needed using values

  const wizardErrors = getWizardErrors(getState());

  if (!_.isEmpty(wizardErrors)) {
    // We've got errors so let redux form know by returning a rejected promise
    return Promise.reject(
      new SubmissionError({
        ...wizardErrors
      })
    );
  }

  // No errors so let redux form know we are all good by returning a resolved promise
  return Promise.resolve();
}

export default WithReduxFormWizardPageValidation;
