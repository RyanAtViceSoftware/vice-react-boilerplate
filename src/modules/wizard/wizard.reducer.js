import { combineReducers } from "redux";
import * as types from "./wizard.actionTypes";
import { wizardStates } from "./wizard.constants";

const initialWizardState = {};
const initialWizardData = {};

// This function uses state.currentState to return child reducers and
// to implicitly change the state of the state machine.
export default combineReducers({
  data: wizardDataReducer,
  stateData: wizardStateMachineReducer
});

function wizardDataReducer(state = initialWizardData, action) {
  switch (action.type) {
    case types.SET_WIZARD_DATA: {
      return { ...state, ...action.payload };
    }
    case types.RESET:
    case types.RESET_WIZARD_DATA:
    case types.CANCEL_CLICKED: {
      return initialWizardData;
    }
    default: {
      return state;
    }
  }
}

// This is an implementation of a state machine using the reducer.
// The state machines design can be found in the docs subfolder in
// this directory. There is an image file for quick reference and
// a wizardStateMachine.xml file that can be used to update the diagram using the
// www.draw.io drawing tool. To update the diagram simply open
// it using File->Open from->Device and select the XML file. When done
// editing then select to save the file to a device and update the
// ./docs/wizardStateMachine.xml as the design is crucial for
// understanding the code and maintaining it's funcitonality
function wizardStateMachineReducer(state = initialWizardState, action) {
  if (action.type === types.CANCEL_CLICKED) {
    return {
      ...state,
      currentState: wizardStates.DISPOSING
    };
  }

  if (action.type === types.RESET) {
    return initialWizardState;
  }

  switch (state.currentState) {
    case wizardStates.CAN_TRANSITION: {
      return canTransitionReducer(state, action);
    }
    case wizardStates.REQUIRES_VALIDATION: {
      return requiresValidationReducer(state, action);
    }
    case wizardStates.VALIDATION_REQUESTED: {
      return validationRequestedReducer(state, action);
    }
    case wizardStates.DONE_REQUESTED: {
      return doneRequestedReducer(state, action);
    }
    case wizardStates.DONE: {
      return doneReducer(state, action);
    }
    case wizardStates.DISPOSING: {
      return disposingReducer(state, action);
    }
    case wizardStates.INITIALIZING: {
      return initializingReducer(state, action);
    }
    case wizardStates.PAGE_INITIALIZED: {
      return pageInitialized(state, action);
    }
    case wizardStates.VALIDATING: {
      return validatingReducer(state, action);
    }
    case wizardStates.VALIDATING_DONE: {
      return validatingDoneReducer(state, action);
    }
    default: {
      return rootWizardReducer(state, action);
    }
  }
}

const onStarted = (state, action) => ({
  name: action.payload.name,
  numberOfPages: action.payload.numberOfPages,
  currentPage: 0,
  isDone: false
});

function backClicked(state) {
  if (state.currentPage > 0) {
    return {
      ...state,
      currentPage: state.currentPage - 1,
      currentState: wizardStates.INITIALIZING
    };
  }

  return state;
}

function moveToNextPage(state) {
  if (state.currentPage === state.numberOfPages - 1) {
    return state;
  }

  return {
    ...state,
    currentPage: state.currentPage + 1,
    currentState: wizardStates.INITIALIZING
  };
}

function onCurrentPageNotValid(state, action) {
  const hasErrorsServerError = action.errorPage >= 0;

  if (hasErrorsServerError) {
    return {
      ...state,
      currentState: wizardStates.REQUIRES_VALIDATION,
      currentPage: action.errorPage,
      errors: action.errors
    };
  }

  return {
    ...state,
    currentState: wizardStates.REQUIRES_VALIDATION
  };
}

function onOtherPageNotValid(state, action) {
  return {
    ...state,
    currentState: wizardStates.CAN_TRANSITION,
    currentPage: action.errorPage,
    errors: action.errors
  };
}

function rootWizardReducer(state, action) {
  switch (action.type) {
    case types.STARTED: {
      return {
        ...onStarted(state, action),
        currentState: wizardStates.INITIALIZING
      };
    }
    default: {
      return state;
    }
  }
}

function pageInitialized(state, action) {
  switch (action.type) {
    case types.REQUIRES_VALIDATION: {
      return {
        ...state,
        currentState: wizardStates.REQUIRES_VALIDATION
      };
    }
    case types.CAN_TRANSITION: {
      return {
        ...state,
        currentState: wizardStates.CAN_TRANSITION
      };
    }
    default: {
      return state;
    }
  }
}

function initializingReducer(state, action) {
  switch (action.type) {
    case types.INITIALIZED: {
      return {
        ...state,
        currentState: wizardStates.PAGE_INITIALIZED
      };
    }
    default: {
      return state;
    }
  }
}

function validatingReducer(state, action) {
  switch (action.type) {
    case types.VALID: {
      return moveToNextPage(state);
    }
    case "@@redux-form/SET_SUBMIT_FAILED":
    case types.CURRENT_PAGE_NOT_VALID: {
      return onCurrentPageNotValid(state, action);
    }
    case types.OTHER_PAGE_NOT_VALID: {
      return onOtherPageNotValid(state, action);
    }
    default: {
      return state;
    }
  }
}

function validatingDoneReducer(state, action) {
  switch (action.type) {
    case types.VALID: {
      return {
        ...state,
        currentState: wizardStates.DISPOSING
      };
    }
    case "@@redux-form/SET_SUBMIT_FAILED":
    case types.CURRENT_PAGE_NOT_VALID: {
      return onCurrentPageNotValid(state, action);
    }
    case types.OTHER_PAGE_NOT_VALID: {
      return onOtherPageNotValid(state, action);
    }
    default: {
      return state;
    }
  }
}

function disposingReducer(state, action) {
  switch (action.type) {
    case types.FINISHED_DISPOSING: {
      return {
        ...state,
        currentState: wizardStates.DONE
      };
    }
    default: {
      return state;
    }
  }
}

function doneReducer(state, action) {
  switch (action.type) {
    case types.STARTED: {
      return onStarted(state, action);
    }
    default: {
      return state;
    }
  }
}

function doneRequestedReducer(state, action) {
  switch (action.type) {
    case types.VALIDATING: {
      return {
        ...state,
        currentState: wizardStates.VALIDATING_DONE
      };
    }
    default: {
      return state;
    }
  }
}

function canTransitionReducer(state, action) {
  switch (action.type) {
    case types.REQUIRES_VALIDATION: {
      return {
        ...state,
        currentState: wizardStates.REQUIRES_VALIDATION
      };
    }
    case types.NEXT_CLICKED: {
      return moveToNextPage(state);
    }
    case types.BACK_CLICKED: {
      return backClicked(state);
    }
    case types.DONE_CLICKED: {
      return {
        ...state,
        currentState: wizardStates.DISPOSING
      };
    }
    default: {
      return state;
    }
  }
}

function requiresValidationReducer(state, action) {
  switch (action.type) {
    case types.NEXT_CLICKED: {
      return {
        ...state,
        currentState: wizardStates.VALIDATION_REQUESTED
      };
    }
    case types.BACK_CLICKED: {
      return backClicked(state);
    }
    case types.DONE_CLICKED: {
      return {
        ...state,
        currentState: wizardStates.DONE_REQUESTED
      };
    }
    default: {
      return state;
    }
  }
}

function validationRequestedReducer(state, action) {
  switch (action.type) {
    case types.VALIDATING: {
      return {
        ...state,
        currentState: wizardStates.VALIDATING
      };
    }
    default: {
      return state;
    }
  }
}
