import { STATE_NAME } from "./pendingRequest.constants";

export const getPendingRequest = (state, requestedActionType) =>
  state[STATE_NAME][requestedActionType];
