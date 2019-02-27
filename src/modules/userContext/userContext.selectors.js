import _ from "lodash";

export const getUserContext = state => state.userContext;
export const isAuthenticated = state => !_.isEmpty(getUserContext(state));
export const currentUserHasPermissions = (permissions, state) =>
  userHasPermissions(permissions, state);

function userHasPermissions(permissions, state) {
  if (!permissions || !permissions.length) {
    return true;
  }

  const userContext = getUserContext(state);

  if (
    !userContext ||
    !userContext.permissions ||
    !userContext.permissions.length
  ) {
    return false;
  }

  return !!userContext.permissions.find(userPermission =>
    permissions.find(
      requiredPermission => requiredPermission === userPermission
    )
  );
}
