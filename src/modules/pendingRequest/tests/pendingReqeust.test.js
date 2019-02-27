import pendingRequest from "../../../modules/pendingRequest";

const {
  reducer,
  actions,
  selectors: { getPendingRequest },
  constants: { STATE_NAME }
} = pendingRequest;

describe("Given we have no pending request", () => {
  it("When we add a new pending request Then its added to new state", () => {
    const expectedActionType = "expectedActionType";

    expect(
      reducer(null, actions.addPendingRequest(expectedActionType))
    ).toEqual({
      [expectedActionType]: {
        turnSpinnerOff: false
      }
    });
  });
});

describe("Given we have pending request", () => {
  it("When we add a new pending request Then its added to new state", () => {
    const expectedActionType = "expectedActionType";
    const existingActionType = "existingActionType";

    expect(
      reducer(
        {
          [existingActionType]: {
            turnSpinnerOff: false
          }
        },
        actions.addPendingRequest(expectedActionType)
      )
    ).toEqual({
      [existingActionType]: {
        turnSpinnerOff: false
      },
      [expectedActionType]: {
        turnSpinnerOff: false
      }
    });
  });

  it("When we delete an existing pending request Then its removed from new state", () => {
    const existingActionType = "existingActionType";

    expect(
      reducer(
        {
          [existingActionType]: {
            turnSpinnerOff: false
          }
        },
        actions.deletePendingRequest(existingActionType)
      )
    ).toEqual({});
  });

  it("When we cancel existing pending request Then its removed from new state", () => {
    const existingActionType = "existingActionType";

    expect(
      reducer(
        {
          [existingActionType + "1"]: {
            turnSpinnerOff: true
          },
          [existingActionType + "2"]: {
            turnSpinnerOff: false
          }
        },
        actions.cancelPendingRequest(existingActionType)
      )
    ).toEqual({
      [existingActionType + "1"]: {
        turnSpinnerOff: true,
        cancelled: true
      },
      [existingActionType + "2"]: {
        turnSpinnerOff: false,
        cancelled: true
      }
    });
  });
});

describe("Given we have pending requested ", () => {
  it("Then calling getRequest with an actionType that is pending returns the correct request", () => {
    const existingActionType = "existingActionType";

    const pendingRequest = {
      [existingActionType + "1"]: {
        turnSpinnerOff: true
      },
      [existingActionType + "2"]: {
        turnSpinnerOff: false
      }
    };

    expect(
      getPendingRequest(
        { [STATE_NAME]: pendingRequest },
        existingActionType + "1"
      )
    ).toEqual({
      turnSpinnerOff: true
    });
  });
  it("Then calling getRequest with an actionType that is not pending returns undefined", () => {
    const existingActionType = "existingActionType";

    const pendingRequest = {
      [existingActionType + "1"]: {
        turnSpinnerOff: true
      },
      [existingActionType + "2"]: {
        turnSpinnerOff: false
      }
    };

    expect(
      getPendingRequest(
        { [STATE_NAME]: pendingRequest },
        "notPendingActionType"
      )
    ).toBe(undefined);
  });
});
