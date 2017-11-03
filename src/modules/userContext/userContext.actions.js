import http from '../http';
import * as actionTypes from './userContext.actionTypes';
import error from '../error';

const { actions: { handleError }} = error;

export const login = (userName, password) =>
  async dispatch => {
    try {
      dispatch({type: actionTypes.LOGIN_REQUESTED});
      
      const response = await http.get({
        url: 'user-context',
        body: {userName, password},
        stubSuccess: {
          userName,
          displayName: 'Ryan Vice',
          permissions: ['can-do-anything']
        }
      });

      dispatch({type: actionTypes.LOGIN_RECEIVED, payload: response.body});
    } catch (error) {
      dispatch(handleError(actionTypes.LOGIN_ERROR, error));
    }
  };