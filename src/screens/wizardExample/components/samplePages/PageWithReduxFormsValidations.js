import React from "react";
import { Field } from "redux-form";
import "../wizardExample.css";
import wizard from "../../../../modules/wizard";
import forms from "../../../../modules/forms";

const {
  components: { ValidatingInputField },
  validators: { required }
} = forms;

const {
  components: { WithReduxFormWizardPageValidation }
} = wizard;

const PageWithReduxFormsValidations = props => (
  <form onSubmit={props.handleSubmit}>
    <Field
      component={ValidatingInputField}
      type="text"
      name="requiredText"
      validate={[required]}
      label="Required Text"
    />
  </form>
);

export default WithReduxFormWizardPageValidation(
  PageWithReduxFormsValidations,
  { formName: "PageWithReduxFormsValidations" }
);
