import React from "react";
// import * as modalActions from "../../modal/modal.actions";
import { connect } from "react-redux";
import { submit, destroy } from "redux-form";
import {
  pageRequiresValidation,
  pageValid,
  pageNotValid,
  finishedDisposing,
  validating,
  initialized
} from "../wizard.actions";
import { getWizardState, getForm } from "../wizard.selectors";
import { wizardStates } from "../wizard.constants";
import ValidatingWizardPage from "./ValidatingWizardPageContainer";

// Exported for testing
export class ValidatingReduxFormWizardPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.tryToValidateForm = this.tryToValidateForm.bind(this);
    this.tryDestroyForm = this.tryDestroyForm.bind(this);
    this.startReduxFormsValidation = this.startReduxFormsValidation.bind(this);
    this.transitionStateMachine = this.transitionStateMachine.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.wizard.currentState !== this.props.wizard.currentState) {
      this.transitionStateMachine(nextProps);
      return;
    }

    const wizardStateDidntChangeButFormFinishedSubmittingAndWeAreValidating =
      (nextProps.wizard.currentState === wizardStates.VALIDATING ||
        nextProps.wizard.currentState === wizardStates.VALIDATING_DONE) &&
      this.isFormSubmittingFinished(nextProps.form);

    if (wizardStateDidntChangeButFormFinishedSubmittingAndWeAreValidating) {
      this.tryToValidateForm(nextProps);
      return;
    }

    const weAreInitializingAndFormInitialChangedAndWeRequireInitialization =
      nextProps.wizard.currentState === wizardStates.INITIALIZING &&
      ((nextProps.form.initial && !this.props.initial) ||
        !this.props.requiresInitialization);

    if (weAreInitializingAndFormInitialChangedAndWeRequireInitialization) {
      this.props.initialized();
    }
  }

  componentDidUpdate(previousProps) {
    const requiresValidationAndHasServerSideValidationErrors =
      this.props.wizard !== previousProps.wizard &&
      this.props.wizard.currentState === wizardStates.REQUIRES_VALIDATION &&
      this.props.wizard.errors;

    if (requiresValidationAndHasServerSideValidationErrors) {
      // At this point we have server side validation errors and need
      // to show validation errors
      this.props.startReduxFormsValidation();
    }
  }

  transitionStateMachine(nextProps) {
    switch (nextProps.wizard.currentState) {
      case wizardStates.DONE_REQUESTED:
      case wizardStates.VALIDATION_REQUESTED: {
        this.startReduxFormsValidation();
        break;
      }
      case wizardStates.VALIDATING:
      case wizardStates.VALIDATING_DONE: {
        this.tryToValidateForm(nextProps);
        break;
      }
      case wizardStates.DISPOSING: {
        this.tryDestroyForm();
        break;
      }
      default: {
        break;
      }
    }
  }

  tryDestroyForm() {
    const { formName } = this.props;
    if (formName) {
      this.props.destroy(formName);
    }
  }

  startReduxFormsValidation() {
    // We are using redux form's sumbit action creator to force our form to validate
    // and update redux.
    this.props.submit(this.props.formName);
  }

  tryToValidateForm(nextProps) {
    const formChanged = nextProps.form && nextProps.form !== this.props.form;
    const formHasValidationErrors =
      nextProps.form &&
      (nextProps.form.syncErrors || nextProps.form.submitErrors);

    if (formChanged) {
      if (this.isFormSubmittingFinished(nextProps.form)) {
        if (formHasValidationErrors) {
          // if handlesValidation is true then the current page wants us to
          // delegate validation duties to it and so we will flip the validate
          // flag which will be passed as props to the current page to let that
          // page know it's time to run it's validation rules
          nextProps.handlesValidation
            ? this.setState({ validate: true }) // Delegate to page we are wrapping
            : this.props.pageNotValid();
        } else {
          this.props.pageValid();
        }
      }
    }
  }

  isFormSubmittingFinished(form) {
    return !form.submitting && (form.submitFailed || form.submitSucceeded);
  }

  render() {
    return (
      <ValidatingWizardPage {...this.props}>
        {this.props.children}
      </ValidatingWizardPage>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    wizard: getWizardState(state),
    form: getForm(state, ownProps.formName)
  };
};

const mapDispatchToProps = {
  // ...modalActions,
  pageRequiresValidation,
  pageNotValid,
  pageValid,
  submit,
  destroy,
  finishedDisposing,
  validating,
  initialized
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidatingReduxFormWizardPageContainer);
