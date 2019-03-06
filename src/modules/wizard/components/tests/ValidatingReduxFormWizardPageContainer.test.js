import React from "react";
import { ValidatingReduxFormWizardPageContainer } from "../ValidatingReduxFormWizardPageContainer";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16/build/index";
import Enzyme from "enzyme/build/index";
import { wizardStates } from "../../wizard.constants";

describe("Given we mount ValidatingReduxFormWizardPageContainer ", () => {
  describe("When we change wizard.currentState to PAGE_INITIALIZED ", () => {
    it("Then pageRequiresValidation is called ", () => {
      Enzyme.configure({ adapter: new Adapter() });

      expect(ValidatingReduxFormWizardPageContainer).toBeTruthy();

      let wizard = {
        currentState: wizardStates.INITIALIZING
      };

      const pageRequiresValidationStub = jest.fn();

      const wrapper = shallow(
        <ValidatingReduxFormWizardPageContainer
          wizard={wizard}
          pageRequiresValidation={pageRequiresValidationStub}
        />
      );

      expect(wrapper).toBeTruthy();

      expect(pageRequiresValidationStub.mock.calls.length).toBe(0);

      wrapper.setProps({
        wizard: { currentState: wizardStates.PAGE_INITIALIZED }
      });

      expect(pageRequiresValidationStub.mock.calls.length).toBe(1);
    });
  });
});
