import React from "react";
import { Field, SubmissionError } from "redux-form";
import { connect } from "react-redux";
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

let PageWithReduxFormsValidations = ({ onSubmit, handleSubmit, ...rest }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      component={ValidatingInputField}
      type="number"
      name="requiredNumber"
      validate={[required]}
      label="Required Number"
    />
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
