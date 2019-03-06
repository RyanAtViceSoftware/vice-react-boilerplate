import React from "react";
import classNames from "classnames";
import _ from "lodash";

const Step = ({ stepNumber, currentStep }) => {
  const isCurrentOrPastStep = stepNumber <= currentStep;
  return (
    <div
      className={classNames("fa", {
        "fa-circle": isCurrentOrPastStep,
        "fa-circle-o": !isCurrentOrPastStep
      })}
    />
  );
};

const NextButton = ({ isLastPage, handleDone, handleNext }) => (
  <button
    id="wizard-doneNextButton"
    className="btn btnDefault"
    onClick={e => {
      e.target.blur();
      return isLastPage ? handleDone() : handleNext();
    }}
  >
    {isLastPage ? "Done" : "Next"}
  </button>
);

const BackButton = ({ currentPage, handleBack }) => (
  <div>
    {!!currentPage && (
      <button
        id="wizard-backButton"
        className="btn btnSecondary"
        onClick={e => {
          e.target.blur();
          handleBack();
        }}
      >
        Back
      </button>
    )}
  </div>
);

const CancelButton = ({ handleCancel }) => (
  <button
    id="wizard-cancelButton"
    className="btn btnSecondary"
    onClick={() => handleCancel()}
  >
    Cancel
  </button>
);

const WizardBreadCrub = ({ steps, currentStep }) => (
  <div className="stepcntnr">
    <div className="stepper">
      {_.range(1, 2 * steps.length).map(s => {
        if (s % 2 === 0) {
          return <div key={`line${s}`} className="line" />;
        }

        const stepNumber = s === 1 ? s : Math.ceil(s / 2);
        return (
          <Step
            key={stepNumber}
            stepNumber={stepNumber}
            title={steps[stepNumber - 1].title}
            currentStep={currentStep}
          />
        );
      })}
    </div>
    <div className="steps">
      {steps.map(s => (
        <div key={s.title} className="steptext">
          {s.title}
        </div>
      ))}
    </div>
  </div>
);

const Wizard = ({
  pages,
  currentPage,
  handleBack,
  handleCancel,
  handleNext,
  handleDone,
  isLastPage
}) => (
  <div className="mcontentcntnr">
    <WizardBreadCrub steps={pages} currentStep={currentPage + 1} />
    {currentPage >= 0 &&
      React.createElement(pages[currentPage].component, {
        ...pages[currentPage].props
      })}
    <div className="action">
      {currentPage >= 0 && pages[currentPage].navigationBarComponent ? (
        pages[currentPage].navigationBarComponent({
          nextButton: (
            <NextButton
              isLastPage={isLastPage}
              handleDone={handleDone}
              handleNext={handleNext}
            />
          ),
          backButton: (
            <BackButton currentPage={currentPage} handleBack={handleBack} />
          ),
          cancelButton: <CancelButton handleCancel={handleCancel} />
        })
      ) : (
        <div>
          <NextButton
            isLastPage={isLastPage}
            handleDone={handleDone}
            handleNext={handleNext}
          />
          <BackButton currentPage={currentPage} handleBack={handleBack} />
          <CancelButton handleCancel={handleCancel} />
        </div>
      )}
    </div>
  </div>
);

export default Wizard;
