import reducer from "../wizard.reducer";
import * as types from "../wizard.actionTypes";
import { wizardStates } from "../wizard.constants";

describe("wizard reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      data: {},
      stateData: {}
    });
  });

  it("should handle wizard transitions going forward all the way to DONE (Happy path)", () => {
    expect(
      reducer(
        {},
        {
          type: types.STARTED,
          payload: {
            name: "testWizard",
            numberOfPages: 2
          }
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.INITIALIZING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.INITIALIZING
          }
        },
        {
          type: types.INITIALIZED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.PAGE_INITIALIZED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.PAGE_INITIALIZED
          }
        },
        {
          type: types.REQUIRES_VALIDATION
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.REQUIRES_VALIDATION
          }
        },
        {
          type: types.NEXT_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.VALIDATION_REQUESTED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.VALIDATION_REQUESTED
          }
        },
        {
          type: types.VALIDATING
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.VALIDATING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.VALIDATING
          }
        },
        {
          type: types.VALID
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.INITIALIZING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.INITIALIZING
          }
        },
        {
          type: types.INITIALIZED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.PAGE_INITIALIZED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.PAGE_INITIALIZED
          }
        },
        {
          type: types.REQUIRES_VALIDATION
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.REQUIRES_VALIDATION
          }
        },
        {
          type: types.DONE_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.DONE_REQUESTED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.DONE_REQUESTED
          }
        },
        {
          type: types.VALIDATING
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.VALIDATING_DONE
      }
    });
  });

  it("should handle wizard transitions going forward one step, then going back and then all the way to DONE (Happy path)", () => {
    expect(
      reducer(
        {},
        {
          type: types.STARTED,
          payload: {
            name: "testWizard",
            numberOfPages: 2
          }
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.INITIALIZING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.INITIALIZING
          }
        },
        {
          type: types.INITIALIZED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.PAGE_INITIALIZED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.PAGE_INITIALIZED
          }
        },
        {
          type: types.REQUIRES_VALIDATION
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.REQUIRES_VALIDATION
          }
        },
        {
          type: types.NEXT_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.VALIDATION_REQUESTED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.VALIDATION_REQUESTED
          }
        },
        {
          type: types.VALIDATING
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.VALIDATING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.VALIDATING
          }
        },
        {
          type: types.VALID
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.INITIALIZING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.INITIALIZING
          }
        },
        {
          type: types.INITIALIZED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.PAGE_INITIALIZED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.PAGE_INITIALIZED
          }
        },
        {
          type: types.REQUIRES_VALIDATION
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });

    /// Going one step backwards
    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.REQUIRES_VALIDATION
          }
        },
        {
          type: types.BACK_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.INITIALIZING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.INITIALIZING
          }
        },
        {
          type: types.INITIALIZED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.PAGE_INITIALIZED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.PAGE_INITIALIZED
          }
        },
        {
          type: types.REQUIRES_VALIDATION
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });

    /// Going Forward again ///
    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.REQUIRES_VALIDATION
          }
        },
        {
          type: types.NEXT_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.VALIDATION_REQUESTED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.VALIDATION_REQUESTED
          }
        },
        {
          type: types.VALIDATING
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.VALIDATING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.VALIDATING
          }
        },
        {
          type: types.VALID
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.INITIALIZING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.INITIALIZING
          }
        },
        {
          type: types.INITIALIZED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.PAGE_INITIALIZED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.PAGE_INITIALIZED
          }
        },
        {
          type: types.REQUIRES_VALIDATION
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });

    /////// Done ////
    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.REQUIRES_VALIDATION
          }
        },
        {
          type: types.DONE_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.DONE_REQUESTED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.DONE_REQUESTED
          }
        },
        {
          type: types.VALIDATING
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.VALIDATING_DONE
      }
    });
  });

  it("should handle wizard transitions on client validation error on step1)", () => {
    expect(
      reducer(
        {},
        {
          type: types.STARTED,
          payload: {
            name: "testWizard",
            numberOfPages: 2
          }
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.INITIALIZING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.INITIALIZING
          }
        },
        {
          type: types.INITIALIZED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.PAGE_INITIALIZED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.PAGE_INITIALIZED
          }
        },
        {
          type: types.REQUIRES_VALIDATION
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.REQUIRES_VALIDATION
          }
        },
        {
          type: types.NEXT_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.VALIDATION_REQUESTED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.VALIDATION_REQUESTED
          }
        },
        {
          type: types.VALIDATING
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.VALIDATING
      }
    });

    /// Validation Error ///
    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.VALIDATING
          }
        },
        {
          type: "@@redux-form/SET_SUBMIT_FAILED"
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });
  });

  it("should handle wizard transitions on server error when clicking Done", () => {
    expect(
      reducer(
        {},
        {
          type: types.STARTED,
          payload: {
            name: "testWizard",
            numberOfPages: 2
          }
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.INITIALIZING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.INITIALIZING
          }
        },
        {
          type: types.INITIALIZED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.PAGE_INITIALIZED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.PAGE_INITIALIZED
          }
        },
        {
          type: types.REQUIRES_VALIDATION
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.REQUIRES_VALIDATION
          }
        },
        {
          type: types.NEXT_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.VALIDATION_REQUESTED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.VALIDATION_REQUESTED
          }
        },
        {
          type: types.VALIDATING
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.VALIDATING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.VALIDATING
          }
        },
        {
          type: types.VALID
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.INITIALIZING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.INITIALIZING
          }
        },
        {
          type: types.INITIALIZED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.PAGE_INITIALIZED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.PAGE_INITIALIZED
          }
        },
        {
          type: types.REQUIRES_VALIDATION
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.REQUIRES_VALIDATION
          }
        },
        {
          type: types.DONE_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.DONE_REQUESTED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.DONE_REQUESTED
          }
        },
        {
          type: types.VALIDATING
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.VALIDATING_DONE
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.VALIDATING_DONE
          }
        },
        {
          type: types.OTHER_PAGE_NOT_VALID,
          errorPage: 0
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.CAN_TRANSITION
      }
    });
  });

  it("should handle wizard transitions on clicking Cancel", () => {
    expect(
      reducer(
        {},
        {
          type: types.STARTED,
          payload: {
            name: "testWizard",
            numberOfPages: 2
          }
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.INITIALIZING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.INITIALIZING
          }
        },
        {
          type: types.INITIALIZED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.PAGE_INITIALIZED
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.PAGE_INITIALIZED
          }
        },
        {
          type: types.REQUIRES_VALIDATION
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.REQUIRES_VALIDATION
          }
        },
        {
          type: types.CANCEL_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.DISPOSING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.DISPOSING
          }
        },
        {
          type: types.FINISHED_DISPOSING
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.DONE
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.DONE
          }
        },
        {
          type: types.RESET
        }
      )
    ).toEqual({
      data: {},
      stateData: {}
    });
  });

  it("should handle wizard transitions from canTransition state", () => {
    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.CAN_TRANSITION
          }
        },
        {
          type: types.REQUIRES_VALIDATION
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.CAN_TRANSITION
          }
        },
        {
          type: types.NEXT_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.INITIALIZING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.CAN_TRANSITION
          }
        },
        {
          type: types.NEXT_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.CAN_TRANSITION
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.CAN_TRANSITION
          }
        },
        {
          type: types.NEXT_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        isDone: false,
        currentState: wizardStates.CAN_TRANSITION
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 1,
            isDone: false,
            currentState: wizardStates.CAN_TRANSITION
          }
        },
        {
          type: types.BACK_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.INITIALIZING
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.CAN_TRANSITION
          }
        },
        {
          type: types.BACK_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.CAN_TRANSITION
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.CAN_TRANSITION
          }
        },
        {
          type: types.DONE_CLICKED
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.DISPOSING
      }
    });
  });

  it("should handle wizard transitions from validatingDone state", () => {
    const expectedErrors = [{ message: "foo" }];
    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.VALIDATING_DONE
          }
        },
        {
          type: types.CURRENT_PAGE_NOT_VALID,
          errorPage: 1,
          errors: expectedErrors
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        errors: expectedErrors,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });

    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.VALIDATING_DONE
          }
        },
        {
          type: types.VALID
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.DISPOSING
      }
    });
  });

  it("should handle wizard transitions from pageInitialized state", () => {
    const expectedErrors = [{ message: "foo" }];
    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.PAGE_INITIALIZED
          }
        },
        {
          type: types.CAN_TRANSITION
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 0,
        isDone: false,
        currentState: wizardStates.REQUIRES_VALIDATION
      }
    });
  });

  it("should handle wizard transitions from validatingDone state", () => {
    const expectedErrors = [{ message: "foo" }];
    expect(
      reducer(
        {
          data: {},
          stateData: {
            name: "testWizard",
            numberOfPages: 2,
            currentPage: 0,
            isDone: false,
            currentState: wizardStates.VALIDATING
          }
        },
        {
          type: types.OTHER_PAGE_NOT_VALID,
          errors: expectedErrors,
          errorPage: 1
        }
      )
    ).toEqual({
      data: {},
      stateData: {
        name: "testWizard",
        numberOfPages: 2,
        currentPage: 1,
        errors: expectedErrors,
        isDone: false,
        currentState: wizardStates.CAN_TRANSITION
      }
    });
  });
});
