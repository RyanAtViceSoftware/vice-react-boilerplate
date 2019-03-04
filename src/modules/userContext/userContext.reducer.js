import * as actionTypes from "./userContext.actionTypes";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_ASYNC.RECEIVED:
      return action.payload;

    default:
      return state;
  }
}
