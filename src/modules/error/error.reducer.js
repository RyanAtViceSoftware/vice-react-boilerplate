export default function reducer(state = {}, action) {
  if (action.type.includes('_ERROR')) {
    return action.payload;
  }

  return state;
}
