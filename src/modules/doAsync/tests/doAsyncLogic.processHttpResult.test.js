import { processHttpResult } from "../doAsyncLogic";
import * as store from "../../store";
import * as httpCacheSelectors from "../../httpCache/httpCache.selectors";
import { notifySuccess } from "../../notificationPopup/notificationPopup.actions";

jest.mock("../../store");
jest.mock("../../httpCache/httpCache.selectors");

describe("Given we call processHttpResult ", () => {
  afterEach(() => {
    store.dispatch.mockReset();
    store.getState.mockReset();
    httpCacheSelectors.tryToFindRequestInCache.mockReset();
  });

  describe("When the current request is in cache and is cancelled ", () => {
    it("Then we immediately resolve and don't call dispatch ", async () => {
      expect(httpCacheSelectors.tryToFindRequestInCache.mock).toBeTruthy();
      expect(store.dispatch.mock).toBeTruthy();

      httpCacheSelectors.tryToFindRequestInCache.mockReturnValue({
        cancelled: true
      });

      return processHttpResult().then(result => {
        expect(store.dispatch.mock.calls.length).toBe(0);
        expect(result).toBe(undefined);
      });
    });
  });

  describe("When the current request is in cache ", () => {
    describe("and is NOT cancelled and we pass a successMessage and an async actionType ", () => {
      it("Then we dispatch notifySuccess with the successMessage and we dispatch actionType.RECEIVED to let the busy spinner know ", async () => {
        const successMessage = "successMessage";
        const mapResponseToPayload = jest.fn();
        const expectedPayload = "expectedPayload";
        mapResponseToPayload.mockReturnValue(expectedPayload);

        return callProcessHttpResultAndThen({
          successMessage,
          mapResponseToPayload
        }).then(({ store, result, successMessage }) => {
          expect(store.dispatch.mock.calls.length).toBe(2);
          expect(store.dispatch.mock.calls[0][0]).toEqual(
            notifySuccess(successMessage)
          );
          expect(store.dispatch.mock.calls[1][0]).toEqual({
            payload: expectedPayload,
            type: "RECEIVED"
          });

          expect(result).toBe(undefined);
        });
      });
    });

    describe("and is NOT cancelled and we DONT pass a successMessage but pass an async actionType ", () => {
      it("Then we DONT dispatch notifySuccess and we dispatch actionType.RECEIVED to let the busy spinner know ", async () => {
        const mapResponseToPayload = jest.fn();
        const expectedPayload = "expectedPayload";
        mapResponseToPayload.mockReturnValue(expectedPayload);

        return callProcessHttpResultAndThen({ mapResponseToPayload }).then(
          ({ store, result }) => {
            expect(store.dispatch.mock.calls.length).toBe(1);
            expect(store.dispatch.mock.calls[0][0]).toEqual({
              payload: expectedPayload,
              type: "RECEIVED"
            });

            expect(result).toBe(undefined);
          }
        );
      });
    });

    describe("and we pass noBusySpinner ", () => {
      it("Then we dispatch actionType.RECEIVED and payload has noBusySpinnner set to true ", async () => {
        const mapResponseToPayload = jest.fn();
        const expectedPayload = {
          foo: "bar"
        };
        mapResponseToPayload.mockReturnValue(expectedPayload);

        return callProcessHttpResultAndThen({
          mapResponseToPayload,
          noBusySpinner: true
        }).then(({ store, result }) => {
          expect(store.dispatch.mock.calls.length).toBe(1);
          expect(store.dispatch.mock.calls[0][0]).toEqual({
            payload: {
              ...expectedPayload,
              noBusySpinner: true
            },
            type: "RECEIVED"
          });

          expect(result).toBe(undefined);
        });
      });
    });

    describe("and we pass a mapResponseToPayload function that throws ", () => {
      it("Then get an exception thrown by callProcessHttpResultAndThen ", done => {
        const mapResponseToPayload = jest.fn();
        mapResponseToPayload.mockImplementation(() => {
          throw new Error("whoops");
        });

        const exceptionNotThrownFailureMessage =
          "We should have had an exception throw because mapResponseToPayload throws.";

        try {
          callProcessHttpResultAndThen({ mapResponseToPayload }).then(() => {
            done.fail(exceptionNotThrownFailureMessage);
          });
        } catch (e) {
          expect(e.message).toEqual("whoops");
          done();
          return;
        }

        done.fail(exceptionNotThrownFailureMessage);
      });
    });

    describe("and we pass a body but mapRepsonseToPayload doesn't return a payload", () => {
      it("Then get an exception thrown by callProcessHttpResultAndThen ", done => {
        const mapResponseToPayload = jest.fn();
        mapResponseToPayload.mockReturnValue();

        const exceptionNotThrownFailureMessage =
          "We should have had an exception throw because mapResponseToPayload throws.";

        try {
          callProcessHttpResultAndThen({
            mapResponseToPayload,
            httpMethod: "httpMethod",
            url: "url",
            httpConfig: "httpConfig",
            errorMessage: "errorMessage"
          }).then(() => {
            done.fail(exceptionNotThrownFailureMessage);
          });
        } catch (e) {
          expect(e.message).toEqual(
            "errorMessage. \n" +
              "    Unable to complete http request httpMethod:url \n" +
              '      with httpConfig: "httpConfig".'
          );
          done();
          return;
        }

        done.fail(exceptionNotThrownFailureMessage);
      });
    });
  });
});

function callProcessHttpResultAndThen({
  successMessage,
  mapResponseToPayload,
  httpMethod,
  url,
  httpConfig,
  errorMessage,
  noBusySpinner
} = {}) {
  expect(httpCacheSelectors.tryToFindRequestInCache.mock).toBeTruthy();
  expect(store.dispatch.mock).toBeTruthy();

  const body = "body";

  httpCacheSelectors.tryToFindRequestInCache.mockReturnValue({});

  return processHttpResult({
    successMessage,
    dispatch: store.dispatch,
    actionType: {
      RECEIVED: "RECEIVED"
    },
    mapResponseToPayload,
    body,
    httpMethod,
    url,
    httpConfig,
    errorMessage,
    noBusySpinner
  }).then(result => ({ store, result, successMessage }));
}
