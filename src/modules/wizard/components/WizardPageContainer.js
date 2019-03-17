import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  pageRequiresValidation,
  finishedDisposing,
  initialized,
  canTransition
} from "../wizard.actions";
import { getWizardState } from "../wizard.selectors";
import { wizardStates } from "../wizard.constants";

class WizardPageContainer extends React.Component {
  componentDidMount() {
    this.transitionStateMachine(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.wizard.currentState !== prevProps.wizard.currentState) {
      this.transitionStateMachine(this.props);
    }
  }

  transitionStateMachine({
    wizard,
    requiresInitialization,
    initialized,
    requiresValidation,
    canTransition,
    finishedDisposing
  } = {}) {
    switch (wizard.currentState) {
      case wizardStates.INITIALIZING: {
        if (!requiresInitialization) {
          initialized();
        }
        break;
      }
      case wizardStates.PAGE_INITIALIZED: {
        if (requiresValidation) {
          requiresValidation();
        } else {
          canTransition();
        }
        break;
      }
      case wizardStates.DISPOSING: {
        finishedDisposing();
        break;
      }
      default: {
        break;
      }
    }
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    wizard: getWizardState(state)
  };
};

const mapDispatchToProps = {
  pageRequiresValidation,
  finishedDisposing,
  initialized,
  canTransition
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WizardPageContainer);
