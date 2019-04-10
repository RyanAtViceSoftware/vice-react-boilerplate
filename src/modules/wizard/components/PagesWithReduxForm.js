import React from "react";
import WithReduxFormWizardPageValidation from "./WithReduxFormWizardPageValidation";

const PagesWithReduxForm = ({
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

export default WithReduxFormWizardPageValidation(PagesWithReduxForm, props => {
  return {
    isLastPage:
      props && props.currentPageIndex + 1 === props.pagesCount ? true : false,
    formName: "PageWithReduxFormsValidations",
    requiresInitialization: false
  };
});
