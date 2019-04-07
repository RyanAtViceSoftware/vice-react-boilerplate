import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as wizardActions from "../wizard.actions";
import { getWizardState, wizardStateChanged } from "../wizard.selectors";
import { wizardStates } from "../wizard.constants";

class WizardPageContainer extends React.Component {
  componentDidMount() {
    this.transitionStateMachine(this.props);
  }

  componentDidUpdate(prevProps) {
    if (wizardStateChanged(prevProps, this.props)) {
      this.transitionStateMachine(this.props);
    }
  }

  transitionStateMachine({
    wizard,
    requiresInitialization,
    initialized,
    requiresValidation,
    pageRequiresValidation,
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
          pageRequiresValidation();
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
  pageRequiresValidation: wizardActions.pageRequiresValidation,
  finishedDisposing: wizardActions.finishedDisposing,
  initialized: wizardActions.initialized,
  canTransition: wizardActions.canTransition
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WizardPageContainer);
