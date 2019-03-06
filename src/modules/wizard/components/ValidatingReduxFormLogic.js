import { wizardStates } from "../wizard.constants";

export function componentWillReceiveProps(nextProps, self) {
  if (nextProps.wizard.currentState !== self.props.wizard.currentState) {
    handleWizardStateMachineTransitions(nextProps, self);
    return;
  }

  const wizardStateDidntChangeButFormFinishedSubmittingAndWeAreValidating =
    (nextProps.wizard.currentState === wizardStates.VALIDATING ||
      nextProps.wizard.currentState === wizardStates.VALIDATING_DONE) &&
    isFormSubmittingFinished(nextProps.form, self);

  if (wizardStateDidntChangeButFormFinishedSubmittingAndWeAreValidating) {
    tryToValidateForm(nextProps, self);
    return;
  }

  if (
    nextProps.wizard.currentState === wizardStates.INITIALIZING &&
    ((nextProps.form.initial && !self.props.initial) ||
      !self.props.requiresInitialization)
  ) {
    self.props.initialized();
    return;
  }
}

export function componentDidUpdate(previousProps, component) {
  const requiresValidationAndHasServerSideValidationErrors =
    component.props.wizard !== previousProps.wizard &&
    component.props.wizard.currentState === wizardStates.REQUIRES_VALIDATION &&
    component.props.wizard.errors;

  if (requiresValidationAndHasServerSideValidationErrors) {
    // At this point we have server side validation errors and need
    // to show validation errors
    component.props.startReduxFormsValidation();
  }
}

function handleWizardStateMachineTransitions(nextProps, component) {
  switch (nextProps.wizard.currentState) {
    case wizardStates.PAGE_INITIALIZED: {
      component.props.pageRequiresValidation();
      break;
    }
    case wizardStates.DONE_REQUESTED:
    case wizardStates.VALIDATION_REQUESTED: {
      startReduxFormsValidation(component);
      component.props.validating();
      break;
    }
    case wizardStates.VALIDATING:
    case wizardStates.VALIDATING_DONE: {
      tryToValidateForm(component);
      break;
    }
    case wizardStates.DISPOSING: {
      tryDestroyForm(component);
      component.props.finishedDisposing();
      break;
    }
    default: {
      break;
    }
  }
}

function tryDestroyForm(component) {
  const { formName } = component.props;
  if (formName) {
    component.props.destroy(formName);
  }
}

function startReduxFormsValidation(component) {
  // We are using redux form's sumbit action creator to force our form to validate
  // and update redux.
  component.props.submit(component.props.formName);
}

function tryToValidateForm(nextProps, component) {
  const formChanged = nextProps.form && nextProps.form !== component.props.form;
  const formHasValidationErrors =
    nextProps.form &&
    (nextProps.form.syncErrors || nextProps.form.submitErrors);

  if (formChanged) {
    if (isFormSubmittingFinished(nextProps.form, component)) {
      if (formHasValidationErrors) {
        // if handlesValidation is true then the current page wants us to
        // delegate validation duties to it and so we will flip the validate
        // flag which will be passed as props to the current page to let that
        // page know it's time to run it's validation rules
        nextProps.handlesValidation
          ? component.setState({ validate: true }) // Delegate to page we are wrapping
          : component.props.pageNotValid();
      } else {
        component.props.pageValid();
      }
    }
  }
}

function isFormSubmittingFinished(form) {
  return (
    !form["submitting"] && (form["submitFailed"] || form["submitSucceeded"])
  );
}
