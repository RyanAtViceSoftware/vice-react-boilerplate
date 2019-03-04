import { ACTION_TYPE_PREFIX } from "../../config";
import { STATE_NAME } from "./notificationPopup.constants";

export const RESET = `${ACTION_TYPE_PREFIX}/${STATE_NAME}/RESET`;
export const NOTIFY_SUCCESS = `${ACTION_TYPE_PREFIX}/${STATE_NAME}/NOTIFY_SUCCESS`;
export const CLOSE = `${ACTION_TYPE_PREFIX}/${STATE_NAME}/CLOSE`;
