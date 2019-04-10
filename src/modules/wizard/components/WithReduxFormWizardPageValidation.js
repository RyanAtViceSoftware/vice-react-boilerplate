import React from "react";
import _ from "lodash";
import { reduxForm, SubmissionError } from "redux-form";
import ValidatingReduxFormWizardPageContainer from "./ValidatingReduxFormWizardPageContainer";
import { getWizardErrors } from "../wizard.selectors";
import { getState } from "../../store";

const WithReduxFormWizardPageValidation = (wrappedComponent, data) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      let config = {};
      if (data(props).isLastPage) {
        config = {
          form: data(props).formName,
          destroyOnUnmount: false,
          forceUnregisterOnUnmount: true,
          keepDirtyOnReinitialize: true,
          enableReinitialize: true
        };
      } else {
        config = {
          form: data(props).formName,
          destroyOnUnmount: false,
          forceUnregisterOnUnmount: true,
          onSubmit: submit
        };
      }
      this.state = {
        config
      };
    }

    render() {
      const page = reduxForm(this.state.config)(wrappedComponent);
      return (
        <ValidatingReduxFormWizardPageContainer
          formName={this.state.config.form}
          handlesValidation
          requiresInitialization={data(this.props).requiresInitialization}
          {...this.props}
        >
          {React.createElement(page, this.props)}
        </ValidatingReduxFormWizardPageContainer>
      );
    }
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
};

export default WithReduxFormWizardPageValidation;
