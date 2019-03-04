import { NOTIFY_SUCCESS, RESET, CLOSE } from "./notificationPopup.actionTypes";

export default function reducer(state = {}, action) {
  if (action.type.includes("_ERROR")) {
    return action.payload;
  }

  switch (action.type) {
    case CLOSE:
    case RESET: {
      return {};
    }
    case NOTIFY_SUCCESS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
