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

  transitionStateMachine(nextProps) {
    switch (nextProps.wizard.currentState) {
      case wizardStates.INITIALIZING: {
        if (!nextProps.requiresInitialization) {
          nextProps.initialized();
        }
        break;
      }
      case wizardStates.PAGE_INITIALIZED: {
        if (nextProps.requiresValidation) {
          nextProps.requiresValidation();
        } else {
          nextProps.canTransition();
        }
        break;
      }
      case wizardStates.DISPOSING: {
        nextProps.finishedDisposing();
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
