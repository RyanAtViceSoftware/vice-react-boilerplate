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
import WithWrappedReduxFormsWizardPage from "./WithWrappedReduxFormsWizardPage";

export class WizardContainer extends Component {
  state = {
    pages: []
  };

  componentDidMount() {
    const { startWizard, name } = this.props;

    this.setState({ pages: this.props.pages.map(this.decoratePage) });

    startWizard(name, this.state.pages.length);
  }

  componentDidUpdate(prevProps) {
    if (wizardStateChangedTo(prevProps, this.props, wizardStates.DONE)) {
      this.props.resetWizard();
    }
  }

  decoratePage = (page, index) => {
    if (!page.formName) {
      return page;
    }

    const isLastPage = this.props.pages.length === index - 1;

    if (isLastPage) {
      return {
        ...page,
        component: WithWrappedReduxFormsWizardPage(page.component, {
          formName: page.formName,
          isLastPage
        })
      };
    }

    return {
      ...page,
      component: WithWrappedReduxFormsWizardPage(page.component, {
        formName: page.formName,
        isLastPage
      })
    };
  };

  render() {
    const {
      currentPage,
      isLastPage,
      doneClicked,
      backClicked,
      cancelClicked,
      nextClicked
    } = this.props;

    const { pages } = this.state;

    return (
      <Wizard
        pages={pages}
        currentPage={currentPage}
        handleBack={backClicked}
        handleDone={doneClicked}
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
