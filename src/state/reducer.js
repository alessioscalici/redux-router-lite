import { SET_LOCATION } from './types';

export default (state = {}, action = null) => {
  if (!action) {
    return state;
  }
  const { payload } = action;
  switch (action.type) {
    case SET_LOCATION:
      return Object.assign({}, state, {
        location: payload.location,
        route: payload.route.name,
        params: payload.params,
        searchParams: payload.searchParams,
      });

    default:
      return state;
  }
};
