import _ from 'lodash';

export const getUserContext = state => state.userContext;
export const isAuthenticated = state => !_.isEmpty(getUserContext(state));
