import { buildActionType } from "../utilities/reduxUtilities";

export const REQUEST_ALREADY_PENDING_ASYNC = buildActionType(
  "doAsync",
  "REQUEST_ALREADY_PENDING_ASYNC"
);

export const TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC = buildActionType(
  "doAsync",
  "TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC"
);

export const REDUX_CACHE_HIT_RECEIVED_ASYNC = buildActionType(
  "doAsync",
  "REDUX_CACHE_HIT_RECEIVED_ASYNC"
);
