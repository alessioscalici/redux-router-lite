/* eslint import/prefer-default-export : 0 */
import { SET_LOCATION } from './types';


export function setLocation(location, route, params, searchParams) {
  return {
    type: SET_LOCATION,
    payload: {
      location,
      route,
      params: params || {},
      searchParams: searchParams || {},
    },
  };
}
