import React from "react";
import { reduxForm, Field } from "redux-form";
import classNames from "classnames";
import "./wizardExample.css";
import wizard from "../../../modules/wizard";

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

let PageWithReduxFormsValidations = ({ onSubmit, handleSubmit, ...rest }) => (
  <ValidatingReduxFormWizardPage {...rest}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        component={ValidatingInputField}
        type="number"
        name="requiredNumber"
        validate={[required]}
        label="Required Number"
      />
    </form>
  </ValidatingReduxFormWizardPage>
);

PageWithReduxFormsValidations = reduxForm({
  form: "PageWithReduxFormsValidations"
})(PageWithReduxFormsValidations);

export default class PageWithReduxFormsValidationsContainer extends React.Component {
  handleSubmit(values) {
    alert(`Submit succeeded with values: ${JSON.stringify(values)}`);

    return Promise.resolve("Success!");
  }

  render() {
    return (
      <PageWithReduxFormsValidations
        onSubmit={this.handleSubmit}
        {...this.props}
      />
    );
  }
}
