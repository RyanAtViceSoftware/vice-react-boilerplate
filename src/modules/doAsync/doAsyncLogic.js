import * as notificationActions from "../notificationPopup/notificationPopup.actions";
import http from "../http";
import {
  REQUEST_ALREADY_PENDING_ASYNC,
  TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC
} from "./doAsync.actionTypes";
import pendingRequest from "../pendingRequest";
import { getState } from "../store";
import { tryToFindRequestInCache } from "../httpCache/httpCache.selectors";
import { setBusySpinner } from "../pendingRequest/pendingRequest.actions";

const {
  actions: { addPendingRequest, deletePendingRequest },
  selectors: { getPendingRequest }
} = pendingRequest;

export function cleanUpPendingRequests(actionType, dispatch) {
  if (!getPendingRequest(getState(), actionType.REQUESTED)) {
    return;
  }

  if (getPendingRequest(getState(), actionType.REQUESTED).turnSpinnerOff) {
    dispatch({ type: TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC });
  }

  dispatch(deletePendingRequest(actionType.REQUESTED));
}

export function handleError(
  exception,
  onError,
  dispatch,
  actionType,
  httpMethod,
  url,
  httpConfig,
  errorMessage
) {
  if (onError) {
    onError(exception);
  } else {
    logError(dispatch, actionType, httpMethod, url, httpConfig, {
      exception,
      errorMessage: `${errorMessage}.
      An error occurred when trying to dispatch results of ajax call to Redux.`
    });
  }
}

export function getError(httpMethod, url, httpConfig, errorMessage) {
  return `${errorMessage && errorMessage + ". "}
    Unable to complete http request ${httpMethod}:${url} 
      with httpConfig: ${JSON.stringify(httpConfig)}.`;
}

export function logError(
  dispatch,
  actionType,
  httpMethod,
  url,
  httpConfig,
  { exception, errorMessage } = {}
) {
  console.log(
    `${getError(httpMethod, url, httpConfig, errorMessage)}
       Failed with error:`,
    exception
  );

  const { message, stack } = exception;
  dispatch(
    notificationActions.handleError(actionType.ERROR, {
      errorMessage,
      message,
      stack
    })
  );
}

export function processHttpResult({
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
} = {}) {
  const cachedRequest = tryToFindRequestInCache(
    getState(),
    url,
    httpMethod,
    body
  );
  if (cachedRequest && cachedRequest.cancelled) {
    return Promise.resolve();
  }

  if (successMessage) {
    dispatch(notificationActions.notifySuccess(successMessage));
  }

  const payload = mapResponseToPayload(body);

  if (noBusySpinner) {
    payload.noBusySpinner = noBusySpinner;
  }

  if (body && !payload) {
    throw new Error(
      getError(
        httpMethod,
        url,
        httpConfig,
        errorMessage,
        "doAsync was not able to map ajax call's body to a response payload."
      )
    );
  }

  dispatch({
    type: actionType.RECEIVED,
    payload
  });

  return Promise.resolve();
}

export function requestIsAlreadyPending({
  actionType,
  noBusySpinner,
  url,
  httpMethod,
  httpConfig,
  dispatch
} = {}) {
  const thereIsAPendingRequest = getPendingRequest(
    getState(),
    actionType.REQUESTED
  );

  if (thereIsAPendingRequest) {
    const currentRequestRequiresABusySpinner = !noBusySpinner;

    dispatch(
      setBusySpinner(actionType.REQUESTED, currentRequestRequiresABusySpinner)
    );

    dispatch({
      type: REQUEST_ALREADY_PENDING_ASYNC,
      payload: {
        url,
        httpMethod,
        httpConfig,
        actionType,
        noBusySpinner
      }
    });
    return true;
  }

  // At this point we don't have a pending request and
  // the current request doesn't want a spinner so we
  // need to add it to the list of pending requests so
  // future request will know this request is pending
  if (noBusySpinner) {
    dispatch(addPendingRequest(actionType.REQUESTED));
  }

  return false;
}

export function buildHeaders(url, httpConfig) {
  const defaultHeadersObj = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return httpConfig
    ? {
        headers: {
          ...defaultHeadersObj.headers,
          ...httpConfig.headers
        }
      }
    : defaultHeadersObj;
}

export function validateInput(
  actionType,
  url,
  httpMethod,
  mapResponseToPayload,
  errorMessage
) {
  if (!actionType) {
    throw new Error("actionType is required");
  }

  if (!actionType.REQUESTED || !actionType.RECEIVED || !actionType.ERROR) {
    throw new Error(
      "actionType must implement the tripples pattern. " +
        "Note you can use buildAsyncActionType() to easily generate the need action types."
    );
  }

  if (!url) {
    throw new Error("url is required.");
  }

  if (!httpMethod || !http[httpMethod]) {
    throw new Error(
      "httpMethod is required and must index the http service and resolve to a method."
    );
  }

  if (!mapResponseToPayload) {
    throw new Error("mapResponseToPayload type is required.");
  }

  if (!errorMessage) {
    throw new Error("errorMessage is required.");
  }
}
