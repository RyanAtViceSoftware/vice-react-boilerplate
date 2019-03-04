import get from "lodash/get";
import { STATE_NAME } from "./notificationPopup.constants";

export const getError = state => get(state, STATE_NAME);
