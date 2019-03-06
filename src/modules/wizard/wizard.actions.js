import * as types from "./wizard.actionTypes";
import { getState } from "../store";
import { getWizardState } from "./wizard.selectors";

export const startWizard = (name, numberOfPages) => ({
  type: types.STARTED,
  payload: {
    name,
    numberOfPages
  }
});

export const nextClicked = () => ({
  type: types.NEXT_CLICKED
});

export const doneClicked = () => {
  return {
    type: types.DONE_CLICKED
  };
};

export const backClicked = () => ({
  type: types.BACK_CLICKED
});

export const cancelClicked = () => ({
  type: types.CANCEL_CLICKED
});

export const finishedDisposing = () => ({
  type: types.FINISHED_DISPOSING
});

export const initialized = () => {
  return {
    type: types.INITIALIZED
  };
};

export const resetWizard = () => ({
  type: types.RESET
});

export const canTransition = () => ({
  type: types.CAN_TRANSITION
});

export const validating = () => ({
  type: types.VALIDATING
});

// Lets the wizard know that the current page requires validation.
// This will make it so that when the user clicks the next button the wizard
// will not progress unless it gets a Valid action
export const pageRequiresValidation = () => ({
  type: types.REQUIRES_VALIDATION
});

// Will make the page require validation which means the
// user will need to click the next button again to proceed
// ------
// errorPage: specifies the page to set the wizard to. This allows
// support for changing pages to the page that contains the invalid data
// as it's common to submit the data to API on last step while you could
// collect invalid data on earlier pages in the wizard.
// ------
// errors: this contains details about the error(s) that
// occured
export const pageNotValid = (errorPage, errors) => {
  const { currentPage } = getWizardState(getState());

  let type = types.CURRENT_PAGE_NOT_VALID;

  const hasErrorsServerError = errorPage >= 0;

  if (hasErrorsServerError && errorPage !== currentPage) {
    type = types.OTHER_PAGE_NOT_VALID;
  }

  return {
    type,
    errorPage,
    errors: convertErrorPropertiesToCamelCase(errors)
  };

  // Server errors come back pascal so we convert them to
  // camel case here.
  function convertErrorPropertiesToCamelCase(errorObject) {
    if (!errorObject) {
      return undefined;
    }

    return Object.keys(errors).reduce((acc, cur) => {
      acc[toCamelCase(cur)] = errorObject[cur];
      return acc;
    }, {});

    function toCamelCase(string) {
      return string.charAt(0).toLowerCase() + string.slice(1);
    }
  }
};

// Will make the wizard move to the next page
export const pageValid = () => ({
  type: types.VALID
});

// Data Action(s)
export const setWizardData = data => ({
  type: types.SET_WIZARD_DATA,
  payload: data
});
