import doAsync, { cacheHit } from "../doAsync";
import * as doAsyncLogic from "../doAsyncLogic";
import * as store from "../../store";
import http from "../../http";

import { buildHeaders } from "../doAsyncLogic";
import * as httpCacheActions from "../../httpCache/httpCache.actions";
import * as httpCacheSelectors from "../../httpCache/httpCache.selectors";

jest.mock("../doAsyncLogic");
jest.mock("../../store");
jest.mock("../../http");
jest.mock("../../httpCache/httpCache.actions");
jest.mock("../../httpCache/httpCache.selectors");

describe("Given we call doAsync ", () => {
  afterEach(() => {
    store.dispatch.mockReset();
    store.getState.mockReset();
    doAsyncLogic.validateInput.mockReset();
    doAsyncLogic.requestIsAlreadyPending.mockReset();
    httpCacheActions.addRequestToCache.mockReset();
    httpCacheSelectors.tryToFindRequestInCache.mockReset();
    http.get.mockReset();
    http.post.mockReset();
    http.put.mockReset();
    doAsyncLogic.processHttpResult.mockReset();
  });

  describe("When validateInput throws ", () => {
    it("Then logError is called and we rethrow exception ", () => {
      expect(doAsync).toBeTruthy();

      const expectedErrorMessage = "expectedErrorMessage";

      doAsyncLogic.validateInput.mockImplementation(() => {
        throw new Error(expectedErrorMessage);
      });

      const actionType = "actionType";
      const url = "url";
      const httpMethod = "get";
      const mapResponseToPayload = "mapResponseToPayload";
      const errorMessage = "errorMessage";

      try {
        doAsync({
          actionType,
          url,
          httpMethod,
          mapResponseToPayload,
          errorMessage
        })(store.dispatch);

        throw new Error("validateInput should have thrown an error");
      } catch (e) {
        expect(e.message).toEqual(expectedErrorMessage);
        expect(doAsyncLogic.validateInput.mock.calls[0]).toEqual([
          actionType,
          url,
          httpMethod,
          mapResponseToPayload,
          errorMessage
        ]);
      }
    });
  });

  describe("When a request is pending ", () => {
    it("Then actionType.REQUESTED is dispatched and nothing else is dispatched ", async () => {
      expect(doAsync).toBeTruthy();

      const actionType = { REQUESTED: "actionType" };
      const url = "url";
      const httpMethod = "httpMethod";
      const mapResponseToPayload = "mapResponseToPayload";
      const errorMessage = "errorMessage";
      const noBusySpinner = "noBusySpinner";
      const httpConfig = "httpConfig";
      const useCaching = "useCaching";

      doAsyncLogic.requestIsAlreadyPending.mockReturnValue(true);

      return doAsync({
        actionType,
        noBusySpinner,
        url,
        httpMethod,
        httpConfig,
        mapResponseToPayload,
        errorMessage,
        useCaching
      })(store.dispatch).then(r => {
        expect(r).toBe(undefined);

        expect(doAsyncLogic.requestIsAlreadyPending.mock.calls.length).toBe(1);
        expect(doAsyncLogic.requestIsAlreadyPending.mock.calls[0][0]).toEqual({
          actionType,
          noBusySpinner,
          url,
          httpMethod,
          dispatch: store.dispatch,
          httpConfig
        });

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0][0]).toEqual({
          type: actionType.REQUESTED,
          payload: {
            noBusySpinner,
            useCaching
          }
        });
      });
    });
  });

  describe("When arguments are valid and request isn't pending ", () => {
    describe("and the http returns rejected promise", () => {
      it("Then handleError is called ", done => {
        const expectedBody = "expectedBody";
        const expectedError = "expectedError";

        http.get.mockImplementation(() => Promise.reject(expectedError));

        testDoAsync({ expectedBody, expectProcessResult: false })
          .then(({ url, httpMethod, actionType, errorMessage, httpConfig }) => {
            expect(doAsyncLogic.handleError.mock.calls.length).toEqual(1);
            expect(doAsyncLogic.handleError.mock.calls[0][0]).toEqual(
              expectedError
            );
            expect(doAsyncLogic.handleError.mock.calls[0][3]).toEqual(
              actionType
            );
            expect(doAsyncLogic.handleError.mock.calls[0][4]).toEqual(
              httpMethod
            );
            expect(doAsyncLogic.handleError.mock.calls[0][5]).toEqual(url);
            expect(doAsyncLogic.handleError.mock.calls[0][6]).toEqual(
              httpConfig
            );
            expect(doAsyncLogic.handleError.mock.calls[0][7]).toEqual(
              errorMessage
            );

            done();
          })
          .catch(done.fail);
      });
    });

    describe("and the httpMethod is GET", () => {
      it("Then actionType.REQUESTED is dispatched and nothing else is dispatched ", async () => {
        const expectedBody = "expectedBody";

        http.get.mockReturnValue(Promise.resolve(expectedBody));

        return testDoAsync({ expectedBody }).then(({ url, httpConfig }) => {
          expect(http.get.mock.calls.length).toBe(1);
          expect(http.get.mock.calls[0][0]).toEqual(url);
          expect(http.get.mock.calls[0][1]).toEqual(httpConfig);
        });
      });
    });

    describe("and the httpMethod is POST", () => {
      it("Then actionType.REQUESTED is dispatched and nothing else is dispatched ", async () => {
        const expectedBody = "expectedBody";

        http.post.mockReturnValue(Promise.resolve(expectedBody));

        return testDoAsync({ expectedBody, httpMethod: "post" }).then(
          ({ url, httpConfig }) => {
            expect(http.post.mock.calls.length).toBe(1);
            expect(http.post.mock.calls[0][0]).toEqual(url);
            expect(http.post.mock.calls[0][1]).toEqual(httpConfig);
          }
        );
      });
    });

    describe("and the httpMethod is PUT", () => {
      it("Then actionType.REQUESTED is dispatched and nothing else is dispatched ", async () => {
        const expectedBody = "expectedBody";

        http.put.mockReturnValue(Promise.resolve(expectedBody));

        return testDoAsync({ expectedBody, httpMethod: "put" }).then(
          ({ url, httpConfig }) => {
            expect(http.put.mock.calls.length).toBe(1);
            expect(http.put.mock.calls[0][0]).toEqual(url);
            expect(http.put.mock.calls[0][1]).toEqual(httpConfig);
          }
        );
      });
    });

    describe("and useCaching is true ", () => {
      describe("and request is NOT in cache ", () => {
        describe("and httpMethdo is GET ", () => {
          it("Then actionType.REQUESTED is dispatched and nothing else is dispatched ", async () => {
            const expectedBody = "expectedBody";
            http.get.mockReturnValue(Promise.resolve(expectedBody));

            return testUseCachingWithRequestNotInCache({ expectedBody }).then(
              ({ url, httpConfig }) => {
                expect(http.get.mock.calls.length).toBe(1);
                expect(http.get.mock.calls[0][0]).toEqual(url);
                expect(http.get.mock.calls[0][1]).toEqual(httpConfig);
              }
            );
          });
        });

        describe("and httpMethdo is POST ", () => {
          it("Then actionType.REQUESTED is dispatched and nothing else is dispatched ", async () => {
            const expectedBody = "expectedBody";
            http.post.mockReturnValue(Promise.resolve(expectedBody));

            return testUseCachingWithRequestNotInCache({
              expectedBody,
              httpMethod: "post"
            }).then(({ url, httpConfig }) => {
              expect(http.post.mock.calls.length).toBe(1);
              expect(http.post.mock.calls[0][0]).toEqual(url);
              expect(http.post.mock.calls[0][1]).toEqual(httpConfig);
            });
          });
        });

        describe("and httpMethdo is PUT ", () => {
          it("Then actionType.REQUESTED is dispatched and nothing else is dispatched ", async () => {
            const expectedBody = "expectedBody";
            http.put.mockReturnValue(Promise.resolve(expectedBody));

            return testUseCachingWithRequestNotInCache({
              expectedBody,
              httpMethod: "put"
            }).then(({ url, httpConfig }) => {
              expect(http.put.mock.calls.length).toBe(1);
              expect(http.put.mock.calls[0][0]).toEqual(url);
              expect(http.put.mock.calls[0][1]).toEqual(httpConfig);
            });
          });
        });
      });

      describe("and request is in cache ", () => {
        describe("and httpMethod is GET ", () => {
          it(
            "Then cacheHit is dispatched, cleanUpPendingRequest is called " +
              "and actionType.REQUESTED are dispatched and nothing else is dispatched ",
            async () => {
              return testUseCachingWithRequestInCache();
            }
          );
        });

        describe("and httpMethod is POST ", () => {
          it(
            "Then cacheHit is dispatched, cleanUpPendingRequest is called " +
              "and actionType.REQUESTED are dispatched and nothing else is dispatched ",
            async () => {
              return testUseCachingWithRequestInCache({ httpMethod: "post" });
            }
          );
        });

        describe("and httpMethod is PUT ", () => {
          it(
            "Then cacheHit is dispatched, cleanUpPendingRequest is called " +
              "and actionType.REQUESTED are dispatched and nothing else is dispatched ",
            async () => {
              return testUseCachingWithRequestInCache({ httpMethod: "put" });
            }
          );
        });
      });
    });
  });
});

function testUseCachingWithRequestNotInCache({
  expectedBody,
  httpMethod = "get"
} = {}) {
  expect(doAsync).toBeTruthy();
  expect(httpCacheActions.addRequestToCache.mock).toBeTruthy();

  const actionType = { REQUESTED: "actionType" };
  const url = "url";
  const mapResponseToPayload = "mapResponseToPayload";
  const errorMessage = "errorMessage";
  const noBusySpinner = "noBusySpinner";
  const httpConfig = "httpConfig";
  const useCaching = true;
  const expectedAddRequestToCacheResult = "expectedAddRequestToCacheResult";

  httpCacheSelectors.tryToFindRequestInCache.mockReturnValue(false);

  httpCacheActions.addRequestToCache.mockReturnValue(
    expectedAddRequestToCacheResult
  );

  return doAsync({
    actionType,
    noBusySpinner,
    url,
    httpMethod,
    httpConfig,
    mapResponseToPayload,
    errorMessage,
    useCaching
  })(store.dispatch).then(r => {
    expect(doAsyncLogic.requestIsAlreadyPending.mock.calls.length).toBe(1);

    expect(doAsyncLogic.requestIsAlreadyPending.mock.calls[0][0]).toEqual({
      actionType,
      noBusySpinner,
      url,
      httpMethod,
      dispatch: store.dispatch,
      httpConfig
    });

    expect(store.dispatch.mock.calls.length).toBe(2);

    expect(store.dispatch.mock.calls[0][0]).toEqual({
      type: actionType.REQUESTED,
      payload: {
        noBusySpinner,
        useCaching
      }
    });

    expect(store.dispatch.mock.calls[1][0]).toEqual(
      expectedAddRequestToCacheResult
    );

    const tempHttpConfig = {
      ...httpConfig,
      ...buildHeaders(url, httpConfig)
    };

    expect(doAsyncLogic.processHttpResult.mock.calls.length).toBe(1);
    expect(doAsyncLogic.processHttpResult.mock.calls[0][0]).toEqual({
      body: expectedBody,
      dispatch: store.dispatch,
      mapResponseToPayload,
      noBusySpinner,
      actionType,
      httpMethod,
      url,
      httpConfig: tempHttpConfig,
      errorMessage
    });

    return {
      url,
      httpConfig: tempHttpConfig
    };
  });
}

function testUseCachingWithRequestInCache({ httpMethod = "get" } = {}) {
  expect(doAsync).toBeTruthy();
  expect(httpCacheActions.addRequestToCache.mock).toBeTruthy();

  const actionType = { REQUESTED: "actionType" };
  const url = "url";
  const mapResponseToPayload = "mapResponseToPayload";
  const errorMessage = "errorMessage";
  const noBusySpinner = "noBusySpinner";
  const httpConfig = "httpConfig";
  const useCaching = true;
  const expectedBody = "expectedBody";
  const expectedAddRequestToCacheResult = "expectedAddRequestToCacheResult";

  http.get.mockReturnValue(Promise.resolve(expectedBody));

  httpCacheSelectors.tryToFindRequestInCache.mockReturnValue(true);

  httpCacheActions.addRequestToCache.mockReturnValue(
    expectedAddRequestToCacheResult
  );

  return doAsync({
    actionType,
    noBusySpinner,
    url,
    httpMethod,
    httpConfig,
    mapResponseToPayload,
    errorMessage,
    useCaching
  })(store.dispatch).then(r => {
    expect(doAsyncLogic.requestIsAlreadyPending.mock.calls.length).toBe(1);

    expect(doAsyncLogic.requestIsAlreadyPending.mock.calls[0][0]).toEqual({
      actionType,
      noBusySpinner,
      url,
      httpMethod,
      dispatch: store.dispatch,
      httpConfig
    });

    expect(store.dispatch.mock.calls.length).toBe(2);

    expect(store.dispatch.mock.calls[0][0]).toEqual({
      type: actionType.REQUESTED,
      payload: {
        noBusySpinner,
        useCaching
      }
    });

    expect(store.dispatch.mock.calls[1][0]).toEqual(
      cacheHit(actionType.RECEIVED, noBusySpinner)
    );
  });
}

function testDoAsync({
  expectedBody,
  httpMethod = "get",
  expectProcessResult = true
} = {}) {
  expect(doAsync).toBeTruthy();

  const actionType = { REQUESTED: "actionType" };
  const url = "url";
  const mapResponseToPayload = "mapResponseToPayload";
  const errorMessage = "errorMessage";
  const noBusySpinner = "noBusySpinner";
  const httpConfig = "httpConfig";
  const useCaching = false;

  return doAsync({
    actionType,
    noBusySpinner,
    url,
    httpMethod,
    httpConfig,
    mapResponseToPayload,
    errorMessage,
    useCaching
  })(store.dispatch).then(r => {
    expect(doAsyncLogic.requestIsAlreadyPending.mock.calls.length).toBe(1);
    expect(doAsyncLogic.requestIsAlreadyPending.mock.calls[0][0]).toEqual({
      actionType,
      noBusySpinner,
      url,
      httpMethod,
      dispatch: store.dispatch,
      httpConfig
    });

    expect(store.dispatch.mock.calls.length).toBe(1);
    expect(store.dispatch.mock.calls[0][0]).toEqual({
      type: actionType.REQUESTED,
      payload: {
        noBusySpinner,
        useCaching
      }
    });

    const tempHttpConfig = {
      ...httpConfig,
      ...buildHeaders(url, httpConfig)
    };

    if (expectProcessResult) {
      expect(doAsyncLogic.processHttpResult.mock.calls.length).toBe(1);
      expect(doAsyncLogic.processHttpResult.mock.calls[0][0]).toEqual({
        body: expectedBody,
        dispatch: store.dispatch,
        mapResponseToPayload,
        noBusySpinner,
        actionType,
        httpMethod,
        url,
        httpConfig: tempHttpConfig,
        errorMessage
      });
    }

    return {
      url,
      httpConfig: tempHttpConfig,
      httpMethod,
      actionType,
      errorMessage
    };
  });
}
