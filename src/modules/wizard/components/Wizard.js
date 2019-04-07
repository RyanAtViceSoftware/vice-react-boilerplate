import React, { Fragment } from "react";
import classNames from "classnames";
import "./wizard.css";

const Step = ({ stepNumber, currentStep, page }) => {
  const isCurrentStep = stepNumber === currentStep;
  return (
    <span
      className={classNames("step", {
        active: isCurrentStep
      })}
    />
  );
};

const NextButton = ({ isLastPage, handleDone, handleNext }) => (
  <button
    id="wizard-doneNextButton"
    className="button nextBtn"
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
        className="button prevBtn"
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
    className="button prevBtn"
    onClick={() => handleCancel()}
  >
    Cancel
  </button>
);

const WizardBreadCrub = ({ pages, currentStep }) => (
  <ul className="wizard">
    {pages.map((page, index) => (
      <Step
        key={index}
        stepNumber={index + 1}
        currentStep={currentStep}
        page={page}
      />
    ))}
  </ul>
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
  <div>
    <h3>{pages && pages[currentPage] && pages[currentPage].title}</h3>
    {currentPage >= 0 &&
      React.createElement(pages[currentPage].component, {
        ...pages[currentPage].props
      })}
    <WizardBreadCrub pages={pages} currentStep={currentPage + 1} />
    <div style={{ overflow: "auto" }}>
      <div>
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
          <Fragment>
            <CancelButton handleCancel={handleCancel} />
            <BackButton currentPage={currentPage} handleBack={handleBack} />
            <NextButton
              isLastPage={isLastPage}
              handleDone={handleDone}
              handleNext={handleNext}
            />
          </Fragment>
        )}
      </div>
    </div>
  </div>
);

export default Wizard;
