import * as constants from "./wizard.constants";

export const getWizardState = state => state[constants.STATE_NAME].stateData;
export const getWizardData = state => state[constants.STATE_NAME].data;
export const getWizardErrors = state => getWizardData(state).errors || {};
export const getForm = (state, formName) => state.form[formName];
