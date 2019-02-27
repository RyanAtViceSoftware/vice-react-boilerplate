import http from "../http";
import httpCache from "../httpCache";
import { REDUX_CACHE_HIT_RECEIVED_ASYNC } from "./doAsync.actionTypes";
import { getState } from "../store";
import {
  buildHeaders,
  cleanUpPendingRequests,
  handleError,
  logError,
  processHttpResult,
  requestIsAlreadyPending,
  validateInput
} from "./doAsyncLogic";

const {
  actions: { addRequestToCache },
  selectors: { tryToFindRequestInCache }
} = httpCache;

export const cacheHit = (cachedReceivedAction, noBusySpinner) => ({
  type: REDUX_CACHE_HIT_RECEIVED_ASYNC,
  payload: {
    cachedReceivedAction,
    noBusySpinner
  }
});

const doAsync = ({
  actionType,
  url,
  httpMethod = "get",
  mapResponseToPayload,
  errorMessage,
  httpConfig,
  onError,
  successMessage,
  noBusySpinner,
  useCaching = false,
  stubSuccess,
  stubError
} = {}) => dispatch => {
  try {
    validateInput(
      actionType,
      url,
      httpMethod,
      mapResponseToPayload,
      errorMessage
    );

    dispatch({
      type: actionType.REQUESTED,
      payload: { noBusySpinner, useCaching }
    });

    if (
      requestIsAlreadyPending({
        actionType,
        noBusySpinner,
        url,
        httpMethod,
        httpConfig,
        dispatch
      })
    ) {
      return Promise.resolve();
    }

    if (useCaching) {
      if (
        tryToFindRequestInCache(
          getState(),
          url,
          httpMethod,
          httpConfig && httpConfig.body
        )
      ) {
        dispatch(cacheHit(actionType.RECEIVED, noBusySpinner));
        cleanUpPendingRequests(actionType, dispatch);
        return Promise.resolve();
      }

      const requestConfig = {};

      if (
        httpMethod.toLowerCase() === "post" ||
        httpMethod.toLowerCase() === "put"
      ) {
        requestConfig.body = httpConfig.body;
      }

      dispatch(addRequestToCache({ url, httpMethod, config: requestConfig }));
    }

    httpConfig = {
      ...httpConfig,
      ...buildHeaders(url, httpConfig)
    };

    return http[httpMethod](url, httpConfig, { stubSuccess, stubError })
      .then(body =>
        processHttpResult({
          body,
          dispatch,
          mapResponseToPayload,
          successMessage,
          noBusySpinner,
          actionType,
          httpMethod,
          url,
          httpConfig,
          errorMessage
        })
      )
      .catch(exception => {
        handleError(
          exception,
          onError,
          dispatch,
          actionType,
          httpMethod,
          url,
          httpConfig,
          errorMessage
        );
      })
      .then(() => {
        cleanUpPendingRequests(actionType, dispatch);
      });
  } catch (exception) {
    logError(dispatch, actionType, httpMethod, url, httpConfig, { exception });
    throw exception;
  }
};

export default doAsync;
