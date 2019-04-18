import React, { Component } from "react";
import { connect } from "react-redux";
import Wizard from "./Wizard";
import { getWizardState, wizardStateChangedTo } from "../wizard.selectors";
import {
  resetWizard,
  doneClicked,
  backClicked,
  cancelClicked,
  nextClicked,
  startWizard
} from "../wizard.actions";
import { wizardStates } from "../wizard.constants";

export class WizardContainer extends Component {
  componentDidMount() {
    const { pages, startWizard, name } = this.props;

    startWizard(name, pages.length);
  }

  componentDidUpdate(prevProps) {
    if (wizardStateChangedTo(prevProps, this.props, wizardStates.DONE)) {
      this.props.resetWizard();
    }
  }

  onDoneClicked = () => {
    this.props.doneClicked();

    if (this.props.onDone) {
      this.props.onDone();
    }
  };

  render() {
    const {
      pages,
      currentPage,
      isLastPage,
      backClicked,
      cancelClicked,
      nextClicked
    } = this.props;

    return (
      <Wizard
        pages={pages}
        currentPage={currentPage}
        handleBack={backClicked}
        handleDone={this.onDoneClicked}
        handleCancel={cancelClicked}
        handleNext={nextClicked}
        isLastPage={isLastPage}
      />
    );
  }
}

const mapDispatchToProps = {
  resetWizard,
  doneClicked,
  backClicked,
  cancelClicked,
  nextClicked,
  startWizard
};

const mapStateToProps = state => {
  const wizardState = getWizardState(state);
  return {
    ...wizardState,
    isLastPage: wizardState.currentPage === wizardState.numberOfPages - 1 // TODO: Ryan - this should come back as part of wizard state
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WizardContainer);
