// @flow

import type { Reducer } from 'redux';
import type { RouterState, GenericAction } from '../index';

import { SET_LOCATION } from './actions';


const INITIAL_STATE = {
  location: null,
  route: '',
  params: {},
  searchParams: {},
};

const reducer: Reducer<RouterState, ?GenericAction> = (
  state?: RouterState = INITIAL_STATE,
  action?: GenericAction,
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

export default reducer;
