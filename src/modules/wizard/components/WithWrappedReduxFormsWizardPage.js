import React from "react";
import WithReduxFormWizardPageValidation from "./WithReduxFormWizardPageValidation";

const WithWrappedReduxFormsWizardPage = (
  component,
  { formName, isLastPage = false } = {}
) => {
  if (isLastPage) {
    const LastPageWithForm = ({ onSubmit, handleSubmit }) => (
      <form onSubmit={handleSubmit(onSubmit)}>
        {React.createElement(component)}
      </form>
    );

    return WithReduxFormWizardPageValidation(LastPageWithForm, {
      formName,
      isLastPage: true
    });
  }

  const PageWithForm = props => (
    <form onSubmit={props.handleSubmit}>{React.createElement(component)}</form>
  );

  return WithReduxFormWizardPageValidation(PageWithForm, {
    formName
  });
};

export default WithWrappedReduxFormsWizardPage;
