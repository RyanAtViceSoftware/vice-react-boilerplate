import React from "react";
import { Field, SubmissionError } from "redux-form";
import { connect } from "react-redux";
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

let PageWithReduxFormsValidations = ({ onSubmit, handleSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      component={ValidatingInputField}
      type="number"
      name="requiredNumber"
      validate={[required]}
      label="Required Number"
    />
    <Documetation markdown={getDocs()} />
  </form>
);

PageWithReduxFormsValidations = WithReduxFormWizardPageValidation(
  PageWithReduxFormsValidations,
  {
    formName: "PageWithReduxFormsValidations",
    isLastPage: true
  }
);

class PageWithReduxFormsValidationsContainer extends React.Component {
  handleSubmit = values => {
    if (
      values.requiredText &&
      values.requiredText.toLowerCase() === "servererror"
    ) {
      const errors = {
        requiredText: "A fake server error occurred. Please try again."
      };

      const addEditPromoDetailsPage = 4;
      this.props.pageNotValid(addEditPromoDetailsPage);

      throw new SubmissionError(errors);
    }

    alert(`Submit succeeded with values: ${JSON.stringify(values)}`);

    return Promise.resolve("Success!");
  };

  render() {
    return <PageWithReduxFormsValidations onSubmit={this.handleSubmit} />;
  }
}

export default connect(
  null,
  { pageNotValid: wizard.actions.pageNotValid }
)(PageWithReduxFormsValidationsContainer);

function getDocs() {
  return `
To add a page that **is the last page** that uses \`redux-form\`s validations we add a form using the pattern below:

1. Create your form and wrap it with the \`WithReduxFormWizardPageValidation\` Higer Order Component 

\`\`\`js
let PageWithReduxFormsValidations = ({ onSubmit, handleSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      component={ValidatingInputField}
      type="number"
      name="requiredNumber"
      validate={[required]}
      label="Required Number"
    />
    <Documetation markdown={getDocs()} />
  </form>
);

PageWithReduxFormsValidations = WithReduxFormWizardPageValidation(
  PageWithReduxFormsValidations,
  {
    formName: "PageWithReduxFormsValidations",
    isLastPage: true
  }
);
\`\`\`

Note that we are taking \`onSubmit\` as a property and passing it to \`handleSubmit\` as shown below.

\`\`\`js
<form onSubmit={handleSubmit(onSubmit)}>
\`\`\`

2. We pass handle sumbit to our \`PageWithReduxFormsValidations\` as shown below.

\`\`\`js
class PageWithReduxFormsValidationsContainer extends React.Component {
  handleSubmit = values => {
    if (
      values.requiredText &&
      values.requiredText.toLowerCase() === "servererror"
    ) {
      const errors = {
        requiredText: "A fake server error occurred. Please try again."
      };

      const addEditPromoDetailsPage = 4; // wizard will redirect to page with error
      this.props.pageNotValid(addEditPromoDetailsPage);

      throw new SubmissionError(errors);
    }

    alert(\`Submit succeeded with values: \${JSON.stringify(values)}\`);

    return Promise.resolve("Success!");
  };

  render() {
    return <PageWithReduxFormsValidations onSubmit={this.handleSubmit} />;
  }
}

\`\`\`

Note that \`props.handleSubmit\` will be passed to us by the wizard and will handle advanced
scenarios like navigating to pages when server side errors occur.
`;
}
