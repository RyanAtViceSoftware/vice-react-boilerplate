import React from "react";
import Enzyme, { shallow } from "enzyme/build/index";
import Adapter from "enzyme-adapter-react-16/build/index";
import { WizardContainer } from "../components/WizardContainer";
import { expectNode, notExpectNode } from "../../../test/common.utils";
import { wizardStates } from "../wizard.constants";

Enzyme.configure({ adapter: new Adapter() });

describe("Wizard Container", () => {
  //Mocking mapDispatchToProps func props
  const mockMapDispatchToProps = {
    resetWizard: jest.fn(),
    doneClicked: jest.fn(),
    backClicked: jest.fn(),
    cancelClicked: jest.fn(),
    nextClicked: jest.fn(),
    startWizard: jest.fn()
  };
  //Mocking mapStateToProps props
  const mockWizardState = {
    name: undefined,
    pages: [{ title: "Step 1" }, { title: "Step 2" }],
    isLastPage: false,
    isDone: false,
    formName: "formTestWizard",
    currentPage: 0,
    numberOfPages: 2,
    currentState: "INITIALIZING"
  };

  // beforeEach(() => {
  //   wrapper = shallow(
  //     <WizardContainer {...mockMapDispatchToProps} {...mockWizardState} />
  //   ).dive();
  // });

  it("should call nextClicked on clicking Next", () => {
    const wrapper = shallow(
      <WizardContainer {...mockMapDispatchToProps} {...mockWizardState} />
    );

    const rendered = wrapper.dive();
    expect(mockMapDispatchToProps.startWizard.mock.calls.length).toBe(1);

    const breadCrumb = expectNode(rendered.find("WizardBreadCrub"));
    expect(breadCrumb.props().steps.length).toBe(2);
    expect(breadCrumb.props().currentStep).toBe(1);

    const nextDoneButton = expectNode(
      rendered
        .find("NextButton")
        .dive()
        .find("#wizard-doneNextButton")
    );

    notExpectNode(
      rendered
        .find("BackButton")
        .dive()
        .find("#wizard-backButton")
    );

    expectNode(
      rendered
        .find("CancelButton")
        .dive()
        .find("#wizard-cancelButton")
    );

    nextDoneButton.simulate("click", { target: { blur: () => {} } });
    expect(mockMapDispatchToProps.resetWizard.mock.calls.length).toBe(0);
    expect(mockMapDispatchToProps.doneClicked.mock.calls.length).toBe(0);
    expect(mockMapDispatchToProps.nextClicked.mock.calls.length).toBe(1);
  });

  it("should call cancelClicked on clicking Cancel", () => {
    const newMockMapDispatchToProps = {
      resetWizard: jest.fn(),
      doneClicked: jest.fn(),
      backClicked: jest.fn(),
      cancelClicked: jest.fn(),
      nextClicked: jest.fn(),
      startWizard: jest.fn()
    };
    const wrapper = shallow(
      <WizardContainer {...newMockMapDispatchToProps} {...mockWizardState} />
    );
    const rendered = wrapper.dive();
    const breadCrumb = expectNode(rendered.find("WizardBreadCrub"));

    expect(breadCrumb.props().steps.length).toBe(2);
    expect(breadCrumb.props().currentStep).toBe(1);

    notExpectNode(
      rendered
        .find("BackButton")
        .dive()
        .find("#wizard-backButton")
    );

    const cancelButton = expectNode(
      rendered
        .find("CancelButton")
        .dive()
        .find("#wizard-cancelButton")
    );

    cancelButton.simulate("click", { target: { blur: () => {} } });

    expect(mockMapDispatchToProps.resetWizard.mock.calls.length).toBe(0);
    expect(newMockMapDispatchToProps.nextClicked.mock.calls.length).toBe(0);
    expect(newMockMapDispatchToProps.doneClicked.mock.calls.length).toBe(0);
    expect(newMockMapDispatchToProps.cancelClicked.mock.calls.length).toBe(1);
  });

  it("should call doneClicked/resetWizard action on clicking Done", () => {
    const newMockMapDispatchToProps = {
      resetWizard: jest.fn(),
      doneClicked: jest.fn(),
      backClicked: jest.fn(),
      cancelClicked: jest.fn(),
      nextClicked: jest.fn(),
      startWizard: jest.fn()
    };
    const newProps = {
      ...mockWizardState,
      isLastPage: true,
      currentPage: 1
    };
    const wrapper = shallow(
      <WizardContainer {...newMockMapDispatchToProps} {...newProps} />
    );

    const rendered = wrapper.dive();
    const breadCrumb = expectNode(rendered.find("WizardBreadCrub"));

    expect(breadCrumb.props().steps.length).toBe(2);
    expect(breadCrumb.props().currentStep).toBe(2);

    const nextDoneButton = expectNode(
      rendered
        .find("NextButton")
        .dive()
        .find("#wizard-doneNextButton")
    );

    expectNode(
      rendered
        .find("BackButton")
        .dive()
        .find("#wizard-backButton")
    );

    expectNode(
      rendered
        .find("CancelButton")
        .dive()
        .find("#wizard-cancelButton")
    );

    nextDoneButton.simulate("click", { target: { blur: () => {} } });

    expect(mockMapDispatchToProps.resetWizard.mock.calls.length).toBe(0);
    expect(newMockMapDispatchToProps.nextClicked.mock.calls.length).toBe(0);
    expect(newMockMapDispatchToProps.doneClicked.mock.calls.length).toBe(1);

    wrapper.setProps({ currentState: wizardStates.DONE });

    expect(newMockMapDispatchToProps.resetWizard.mock.calls.length).toBe(1);
  });

  it("should call backClicked action on clicking Back", () => {
    const newMockMapDispatchToProps = {
      resetWizard: jest.fn(),
      doneClicked: jest.fn(),
      backClicked: jest.fn(),
      cancelClicked: jest.fn(),
      nextClicked: jest.fn(),
      startWizard: jest.fn()
    };
    const newProps = {
      ...mockWizardState,
      isLastPage: true,
      currentPage: 1
    };
    const wrapper = shallow(
      <WizardContainer {...newMockMapDispatchToProps} {...newProps} />
    );
    const rendered = wrapper.dive();
    const breadCrumb = expectNode(rendered.find("WizardBreadCrub"));

    expect(breadCrumb.props().steps.length).toBe(2);
    expect(breadCrumb.props().currentStep).toBe(2);

    const backButton = expectNode(
      rendered
        .find("BackButton")
        .dive()
        .find("#wizard-backButton")
    );

    expectNode(
      rendered
        .find("CancelButton")
        .dive()
        .find("#wizard-cancelButton")
    );

    backButton.simulate("click", { target: { blur: () => {} } });

    expect(mockMapDispatchToProps.resetWizard.mock.calls.length).toBe(0);
    expect(newMockMapDispatchToProps.nextClicked.mock.calls.length).toBe(0);
    expect(newMockMapDispatchToProps.doneClicked.mock.calls.length).toBe(0);
    expect(newMockMapDispatchToProps.backClicked.mock.calls.length).toBe(1);
  });
});
