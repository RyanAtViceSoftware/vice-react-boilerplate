import {
  buildActionType,
  buildAsyncActionType
} from "../utilities/reduxUtilities";

export const LOGIN_ASYNC = buildAsyncActionType("user-context", "LOGIN_ASYNC");
export const UPDATE_USER_CONTEXT = buildActionType(
  "user-context",
  "UPDATE_USER_CONTEXT"
);
