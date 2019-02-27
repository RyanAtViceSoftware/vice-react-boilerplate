import * as types from "./pendingRequest.actionTypes";

const intialState = {};

export default function reducer(state = intialState, action) {
  switch (action.type) {
    case types.ADD: {
      const newState = {
        ...state
      };

      newState[action.payload.requestedActionType] = {
        turnSpinnerOff: false
      };

      return newState;
    }

    case types.CANCEL: {
      const newState = {
        ...state
      };

      for (const name in newState) {
        if (newState.hasOwnProperty(name)) {
          newState[name] = {
            ...newState[name],
            cancelled: true
          };
        }
      }

      return newState;
    }

    case types.DELETE: {
      const newState = {
        ...state
      };

      delete newState[action.payload.requestedActionType];

      return newState;
    }

    case types.SET_BUSY_SPINNER: {
      const { turnSpinnerOff } = action.payload;
      const newState = {
        ...state
      };

      newState[action.payload.requestedActionType] = {
        ...newState[action.payload.requestedActionType],
        turnSpinnerOff
      };

      return newState;
    }

    default: {
      return state;
    }
  }
}
