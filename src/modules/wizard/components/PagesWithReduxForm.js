import React from "react";
import WithReduxFormWizardPageValidation from "./WithReduxFormWizardPageValidation";

const PageWithReduxForm = ({
  handleSubmit,
  currentPageIndex,
  pagesCount,
  currentPage
}) => {
  return (
    <form
      onSubmit={
        currentPageIndex + 1 === pagesCount
          ? handleSubmit(currentPage.props.onSubmit)
          : handleSubmit
      }
    >
      {React.createElement(currentPage.component)}
    </form>
  );
};

export default WithReduxFormWizardPageValidation(PageWithReduxForm, {
  formName: "PageWithReduxFormsValidations"
});
