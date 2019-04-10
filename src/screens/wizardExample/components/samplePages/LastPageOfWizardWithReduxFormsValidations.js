import React from "react";
import { Field } from "redux-form";
import { connect } from "react-redux";
import "../wizardExample.css";
import wizard from "../../../../modules/wizard";
import forms from "../../../../modules/forms";

const {
  components: { ValidatingInputField },
  validators: { required }
} = forms;

const PageWithReduxFormsValidations = () => (
  <Field
    component={ValidatingInputField}
    type="number"
    name="requiredNumber"
    validate={[required]}
    label="Required Number"
  />
);

class PageWithReduxFormsValidationsContainer extends React.Component {
  render() {
    return <PageWithReduxFormsValidations />;
  }
}

export default connect(
  null,
  { pageNotValid: wizard.actions.pageNotValid }
)(PageWithReduxFormsValidationsContainer);
