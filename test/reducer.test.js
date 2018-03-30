import reducer from '../src/state/reducer';
import { SET_LOCATION } from '../src/state/types';

const SET_LOCATION_MOCK = {
  type: SET_LOCATION,
  payload: {
    location: {},
    route: { name: 'mockRoute' },
  },
};
describe('router reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return the initial if no action', () => {
    expect(reducer(undefined)).toEqual({});
  });

  it(`should handle "${SET_LOCATION}"`, () => {
    expect(reducer({}, SET_LOCATION_MOCK)).toEqual({
      location: {},
      route: 'mockRoute',
      params: undefined,
      searchParams: undefined,
    });
  });
});
