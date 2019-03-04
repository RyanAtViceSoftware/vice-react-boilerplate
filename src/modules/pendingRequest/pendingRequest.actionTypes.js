import { buildActionType } from "../utilities/reduxUtilities";

export const CANCEL = buildActionType("pendingRequest", "CANCEL");

export const ADD = buildActionType("pendingRequest", "ADD");

export const DELETE = buildActionType("pendingRequest", "DELETE");

export const SET_BUSY_SPINNER = buildActionType(
  "pendingRequest",
  "SET_BUSY_SPINNER"
);
