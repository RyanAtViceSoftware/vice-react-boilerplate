export default function reducer(state = { busyCount: 0 }, action) {
  if (action.type.includes("_REQUESTED")) {
    return {
      busyCount: state.busyCount + 1
    };
  }

  if (action.type.includes("_RECEIVED") || action.type.includes("_ERROR")) {
    return {
      busyCount: state.busyCount - 1
    };
  }

  return state;
}
