

import reducer from '../src/state/reducer';
import { SET_LOCATION } from '../src/state/actions';

const SET_LOCATION_MOCK = {
  type: SET_LOCATION,
  payload: {
    location: {},
    route: 'mockRoute',
  },
};

const INITIAL_STATE = {
  location: null,
  params: {},
  searchParams: {},
  route: '',
};

describe('router reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'some-random-type' })).toEqual(INITIAL_STATE);
  });

  it('should return the initial if no action', () => {
    expect(reducer(undefined)).toEqual(INITIAL_STATE);
  });

  it(`should handle "${SET_LOCATION}"`, () => {
    expect(reducer(undefined, SET_LOCATION_MOCK)).toEqual({
      location: {},
      route: 'mockRoute',
      params: undefined,
      searchParams: undefined,
    });
  });
});
