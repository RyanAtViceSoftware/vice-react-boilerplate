import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import userContext from "./userContext";
import busyIndicator from "./busyIndicator";
import pendingRequest from "./pendingRequest";
import notificationPopup from "./notificationPopup";
import wizard from "./wizard";
import httpCache from "./httpCache";

export default combineReducers({
  [userContext.constants.STATE_NAME]: userContext.reducer,
  [busyIndicator.constants.STATE_NAME]: busyIndicator.reducer,
  [pendingRequest.constants.STATE_NAME]: pendingRequest.reducer,
  [httpCache.constants.STATE_NAME]: httpCache.reducer,
  [notificationPopup.constants.STATE_NAME]: notificationPopup.reducer,
  [wizard.constants.STATE_NAME]: wizard.reducer,
  form: formReducer,
  routing: routerReducer
});
