import * as actionTypes from "./userContext.actionTypes";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_ASYNC.RECEIVED:
      return action.payload;

    case actionTypes.UPDATE_USER_CONTEXT: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
}
