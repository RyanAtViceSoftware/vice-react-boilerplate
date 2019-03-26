import React from "react";
import { reduxForm, Field, SubmissionError } from "redux-form";
import classNames from "classnames";
import _ from "lodash";
import "./wizardExample.css";
import { getState } from "../../../modules/store";
import wizard from "../../../modules/wizard";

const {
  selectors: { getWizardErrors }
} = wizard;

const {
  components: { ValidatingReduxFormWizardPage }
} = wizard;

const required = value => {
  return (!isNaN(value) && +value) || (isNaN(value) && value !== undefined)
    ? undefined
    : "Required";
};

const ValidatingInputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        className={classNames({ error: touched && error })}
        {...input}
        placeholder={label}
        type={type}
      />
      {touched &&
        ((error && <span className="error">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const PageWithReduxFormsValidations = props => (
  <ValidatingReduxFormWizardPage {...props}>
    <form onSubmit={props.handleSubmit}>
      <Field
        component={ValidatingInputField}
        type="text"
        name="requiredText"
        validate={[required]}
        label="Required Text"
      />
    </form>
  </ValidatingReduxFormWizardPage>
);

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

export default reduxForm({
  form: "PageWithReduxFormsValidations",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: submit
})(PageWithReduxFormsValidations);
