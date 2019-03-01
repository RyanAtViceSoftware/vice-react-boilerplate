import { buildActionType } from "../utilities/reduxUtilities";

export const RESET = buildActionType("httpCache", "RESET");

export const ADD = buildActionType("httpCache", "ADD");

export const DELETE = buildActionType("httpCache", "DELETE");
