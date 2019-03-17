import * as constants from "./wizard.constants";

const { wizardStates } = constants;

export const wizardStateChangedTo = (prevProps, props, targetState) =>
  (!prevProps.wizard || prevProps.wizard.currentState !== targetState) &&
  (props.wizard && props.wizard.currentState === targetState);

export const getWizardState = state => state[constants.STATE_NAME].stateData;
export const getWizardData = state => state[constants.STATE_NAME].data;
export const getWizardErrors = state => getWizardData(state).errors || {};
export const getForm = (state, formName) => state.form[formName];

export const wizardIsDisposing = (prevProps, props) =>
  wizardStateChangedTo(prevProps, props, wizardStates.DISPOSING);

export const wizardIsDone = (prevProps, props) =>
  wizardStateChangedTo(prevProps, props, wizardStates.DONE);

export const wizardStateChanged = (prevProps, props) =>
  props.wizard.currentState !== prevProps.wizard.currentState;

export const validationRequested = (prevProps, props) =>
  wizardStateChangedTo(prevProps, props, wizardStates.VALIDATING) ||
  wizardStateChangedTo(prevProps, props, wizardStates.VALIDATING_DONE);
