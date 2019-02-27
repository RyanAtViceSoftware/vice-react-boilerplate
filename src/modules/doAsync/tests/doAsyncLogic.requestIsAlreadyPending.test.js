import { requestIsAlreadyPending } from "../doAsyncLogic";
import * as pendingRequestSelectors from "../../pendingRequest/pendingRequest.selectors";
import * as store from "../../store";
import { REQUEST_ALREADY_PENDING_ASYNC } from "../doAsync.actionTypes";
import {
  addPendingRequest,
  setBusySpinner
} from "../../pendingRequest/pendingRequest.actions";

jest.mock("../../store");
jest.mock("../../pendingRequest/pendingRequest.selectors");

describe("Given we call requestIsAlreadyPending ", () => {
  afterEach(() => {
    store.dispatch.mockReset();
    store.getState.mockReset();
  });

  describe("When no request are pending ", () => {
    it("And there is noBusySpinner false Then we return false and don't call dispatch ", async () => {
      expect(requestIsAlreadyPending).toBeTruthy();
      expect(store.dispatch.mock).toBeTruthy();
      expect(pendingRequestSelectors.getPendingRequest.mock).toBeTruthy();

      pendingRequestSelectors.getPendingRequest.mockReturnValue(false);

      expect(
        requestIsAlreadyPending({
          actionType: { REQUESTED: "" },
          dispatch: store.dispatch
        })
      ).toEqual(false);

      expect(store.dispatch.mock.calls.length).toBe(0);
    });

    it("And there is noBusySpinner true Then we return false and don't call dispatch ", async () => {
      expect(requestIsAlreadyPending).toBeTruthy();
      expect(store.dispatch.mock).toBeTruthy();
      expect(pendingRequestSelectors.getPendingRequest.mock).toBeTruthy();

      const actionType = { REQUESTED: "TYPE_REQUESTED" };

      pendingRequestSelectors.getPendingRequest.mockReturnValue(false);

      expect(
        requestIsAlreadyPending({
          actionType,
          noBusySpinner: true,
          dispatch: store.dispatch
        })
      ).toEqual(false);

      expect(store.dispatch.mock.calls.length).toBe(1);
      expect(store.dispatch.mock.calls[0][0]).toEqual(
        addPendingRequest(actionType.REQUESTED)
      );
    });
  });

  describe("When a request is pending but noBusySpinner is passed in ", () => {
    it("Then we dispatch setBusySpinner with busy spinner true and we dispatch REQUEST_ALREADY_PENDING_ASYNC and we return true  ", async () => {
      testIt(
        { noBusySpinner: false },
        ({ store, actionType, noBusySpinner, url, httpMethod, httpConfig }) => {
          expect(store.dispatch.mock.calls.length).toBe(2);
          expect(store.dispatch.mock.calls[0][0]).toEqual(
            setBusySpinner(actionType.REQUESTED, !noBusySpinner)
          );
          expect(store.dispatch.mock.calls[1][0]).toEqual({
            type: REQUEST_ALREADY_PENDING_ASYNC,
            payload: {
              url,
              httpMethod,
              httpConfig,
              actionType,
              noBusySpinner
            }
          });
        }
      );
    });
  });

  describe("When a request is pending and noBusySpinner is passed in ", () => {
    it("Then we dispatch setBusySpinner with busy spinner true and we dispatch REQUEST_ALREADY_PENDING_ASYNC and we return true  ", async () => {
      testIt(
        { noBusySpinner: true },
        ({ store, actionType, noBusySpinner, url, httpMethod, httpConfig }) => {
          expect(store.dispatch.mock.calls.length).toBe(2);
          expect(store.dispatch.mock.calls[0][0]).toEqual(
            setBusySpinner(actionType.REQUESTED, !noBusySpinner)
          );
          expect(store.dispatch.mock.calls[1][0]).toEqual({
            type: REQUEST_ALREADY_PENDING_ASYNC,
            payload: {
              url,
              httpMethod,
              httpConfig,
              actionType,
              noBusySpinner
            }
          });
        }
      );
    });
  });
});

function testIt({ noBusySpinner }, andThen) {
  expect(requestIsAlreadyPending).toBeTruthy();
  expect(store.dispatch.mock).toBeTruthy();
  expect(pendingRequestSelectors.getPendingRequest.mock).toBeTruthy();

  const actionType = {
    REQUESTED: "TYPE_REQUESTED"
  };
  const url = "expectedUrl";
  const httpMethod = "httpMethod";
  const httpConfig = "httpConfig";

  pendingRequestSelectors.getPendingRequest.mockReturnValue(true);

  expect(
    requestIsAlreadyPending({
      noBusySpinner,
      actionType,
      dispatch: store.dispatch,
      url,
      httpMethod,
      httpConfig
    })
  ).toEqual(true);

  andThen({ store, actionType, noBusySpinner, url, httpMethod, httpConfig });
}
