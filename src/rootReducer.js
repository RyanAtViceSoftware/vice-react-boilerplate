import { combineReducers } from 'redux';
import userContext from './modules/userContext';
import error from './modules/error';
import busyIndicator from './modules/busyIndicator';

export default combineReducers({
  [userContext.constants.STATE_NAME]: userContext.reducer,
  [error.constants.STATE_NAME]: error.reducer,
  [busyIndicator.constants.STATE_NAME]: busyIndicator.reducer,
});