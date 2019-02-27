import * as actionTypes from "./error.actionTypes";

export default function reducer(state = {}, action) {
  if (action.type.includes("_ERROR")) {
    return action.payload;
  }

  switch (action.type) {
    case actionTypes.RESET: {
      return {};
    }
    default: {
      return state;
    }
  }
}
