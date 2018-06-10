// @flow

import type { RouterState } from 'history';
import type { Action } from 'flux-standard-action';

import { SET_LOCATION } from './actions';


const INITIAL_STATE = {
  location: null,
  route: '',
  params: {},
  searchParams: {},
};

export default (
  state?: RouterState = INITIAL_STATE,
  action?: Action<string, ?any, ?any>,
): RouterState => {
  if (!action) {
    return state;
  }
  const { payload } : { payload: RouterState } = action;
  switch (action.type) {
    case SET_LOCATION:
      return Object.assign({}, state, {
        location: payload.location,
        route: payload.route,
        params: payload.params,
        searchParams: payload.searchParams,
      });

    default:
      return state;
  }
};
