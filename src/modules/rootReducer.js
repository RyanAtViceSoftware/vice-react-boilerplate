import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import userContext from './userContext';
import error from './error';
import busyIndicator from './busyIndicator';
// import { routerReducer } from 'react-router-redux'

export default combineReducers({
  [userContext.constants.STATE_NAME]: userContext.reducer,
  [error.constants.STATE_NAME]: error.reducer,
  [busyIndicator.constants.STATE_NAME]: busyIndicator.reducer,
  form: formReducer,
  // routing: routerReducer
});