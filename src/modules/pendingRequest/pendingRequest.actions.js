import {
  CANCEL,
  ADD,
  DELETE,
  SET_BUSY_SPINNER
} from "./pendingRequest.actionTypes";

export const cancelPendingRequest = () => ({
  type: CANCEL
});

export const addPendingRequest = requestedActionType => ({
  type: ADD,
  payload: {
    requestedActionType
  }
});

export const setBusySpinner = (requestedActionType, turnSpinnerOff) => ({
  type: SET_BUSY_SPINNER,
  payload: {
    requestedActionType,
    turnSpinnerOff
  }
});
export const deletePendingRequest = requestedActionType => ({
  type: DELETE,
  payload: {
    requestedActionType
  }
});
