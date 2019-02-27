import * as actionTypes from "./userContext.actionTypes";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_RECEIVED:
      return action.payload;
    case actionTypes.LOGIN_ERROR:
      return state;

    default:
      return state;
  }
}
