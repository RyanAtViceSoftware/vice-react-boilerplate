import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import userContext from "./userContext";
import error from "./error";
import busyIndicator from "./busyIndicator";
// import notificationPopup from "./notificationPopup";
import pendingRequest from "./pendingRequest";
import httpCache from "./httpCache";

export default combineReducers({
  [userContext.constants.STATE_NAME]: userContext.reducer,
  [error.constants.STATE_NAME]: error.reducer,
  [busyIndicator.constants.STATE_NAME]: busyIndicator.reducer,
  // [notificationPopup.constants.STATE_NAME]: notificationPopup.reducer,
  [pendingRequest.constants.STATE_NAME]: pendingRequest.reducer,
  [httpCache.constants.STATE_NAME]: httpCache.reducer,
  form: formReducer,
  routing: routerReducer
});
