import React from "react";
import { Field } from "redux-form";
import "../wizardExample.css";
import forms from "../../../../modules/forms";

const {
  components: { ValidatingInputField },
  validators: { required }
} = forms;

const PageWithReduxFormsValidations = () => (
  <Field
    component={ValidatingInputField}
    type="text"
    name="requiredText"
    validate={[required]}
    label="Required Text"
  />
);

export default PageWithReduxFormsValidations;
