import { cleanUpPendingRequests } from "../doAsyncLogic";
import * as store from "../../store";
import * as pendingRequests from "../../pendingRequest/pendingRequest.selectors";
import { TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC } from "../doAsync.actionTypes";
import { deletePendingRequest } from "../../pendingRequest/pendingRequest.actions";

jest.mock("../../store");
jest.mock("../../pendingRequest/pendingRequest.selectors");

describe("Given we call cleanUpPendingRequests with an actionType and dispatch ", () => {
  afterEach(() => {
    store.dispatch.mockReset();
    store.getState.mockReset();
    pendingRequests.getPendingRequest.mockReset();
  });

  describe("When there are no pending requests ", () => {
    it("Then we return without call dispatch", () => {
      expect(pendingRequests.getPendingRequest.mock).toBeTruthy();
      expect(store.dispatch.mock).toBeTruthy();
      expect(cleanUpPendingRequests).toBeTruthy();

      cleanUpPendingRequests({}, store.dispatch);

      expect(store.dispatch.mock.calls.length).toBe(0);
      expect(pendingRequests.getPendingRequest.mock.calls.length).toBe(1);
    });
  });

  describe("When there is a pending requests that require turning off busy spinner ", () => {
    it("Then pending request is called twice and we dispatch TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC and deletePendingReqeust", () => {
      callPendingRequestAndThen(
        { turnSpinnerOff: true },
        (dispatchMock, expectedActionType) => {
          expect(dispatchMock.mock.calls.length).toBe(2);
          expect(dispatchMock.mock.calls[0][0]).toEqual({
            type: TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC
          });
          expect(dispatchMock.mock.calls[1][0]).toEqual(
            deletePendingRequest(expectedActionType.REQUESTED)
          );
        }
      );
    });
  });

  describe("When there is a pending requests but NOT that require turning off busy spinner ", () => {
    it("Then pending request is called twice and we dispatch ONLY deletePendingReqeust", () => {
      callPendingRequestAndThen(
        { turnSpinnerOff: false },
        (dispatchMock, expectedActionType) => {
          expect(dispatchMock.mock.calls.length).toBe(1);
          expect(dispatchMock.mock.calls[0][0]).toEqual(
            deletePendingRequest(expectedActionType.REQUESTED)
          );
        }
      );
    });
  });
});

function callPendingRequestAndThen({ turnSpinnerOff }, andThen) {
  expect(pendingRequests.getPendingRequest.mock).toBeTruthy();
  expect(store.dispatch.mock).toBeTruthy();
  expect(cleanUpPendingRequests).toBeTruthy();

  pendingRequests.getPendingRequest.mockReturnValue({ turnSpinnerOff });

  const expectedState = "expectedState";

  store.getState.mockReturnValue(expectedState);

  const expectedActionType = {
    REQUESTED: "foo"
  };

  cleanUpPendingRequests(expectedActionType, store.dispatch);

  expect(pendingRequests.getPendingRequest.mock.calls.length).toBe(2);
  expect(pendingRequests.getPendingRequest.mock.calls[0][0]).toBe(
    expectedState
  );
  expect(pendingRequests.getPendingRequest.mock.calls[0][1]).toBe(
    expectedActionType.REQUESTED
  );
  expect(pendingRequests.getPendingRequest.mock.calls[1][0]).toBe(
    expectedState
  );
  expect(pendingRequests.getPendingRequest.mock.calls[1][1]).toBe(
    expectedActionType.REQUESTED
  );

  andThen(store.dispatch, expectedActionType);
}
