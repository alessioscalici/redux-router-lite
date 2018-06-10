// @flow

import type { SetLocationAction, Location } from '../flow-types';


export const SET_LOCATION = '@@router/set-location';

export const setLocation = (
  location: Location,
  route: string,
  params: {[string]: string},
  searchParams: {[string]: string}
): SetLocationAction => ({
  type: SET_LOCATION,
  payload: {
    location,
    route,
    params: params || {},
    searchParams: searchParams || {},
  },
});
