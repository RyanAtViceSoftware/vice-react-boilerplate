import React from "react";
import { Field } from "redux-form";
import "../wizardExample.css";
import wizard from "../../../../modules/wizard";
import forms from "../../../../modules/forms";
import Documetation from "./Documentation";

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
    <Documetation markdown={getDocs()} />
  </form>
);

export default WithReduxFormWizardPageValidation(
  PageWithReduxFormsValidations,
  { formName: "PageWithReduxFormsValidations" }
);

function getDocs() {
  return `
To add a page that **isn't the last page** that uses \`redux-form\`s validations we add a form using the pattern below:

\`\`\`js
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
\`\`\`

Note that \`props.handleSubmit\` will be passed to us by the wizard and will handle advanced
scenarios like navigating to pages when server side errors occur.

Setting Required Text to \`servererror\` will simulate throwing a server side error.
`;
}
