import { isFSA } from 'flux-standard-action';

import {
  setLocation,
} from '../src/state/actions';

import {
  SET_LOCATION,
} from '../src/state/types';

describe('router/actions', () => {
  describe('setLocation', () => {
    const LOCATION = {};
    const ROUTE = 'fakeRouteName';
    const PARAMS = {};
    const SEARCH_PARAMS = {};

    let action;

    beforeEach(() => {
      action = setLocation(LOCATION, ROUTE, PARAMS, SEARCH_PARAMS);
    });

    it('should be FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it(`should be of type "${SET_LOCATION}"`, () => {
      expect(action.type).toBe(SET_LOCATION);
    });

    it('should set the payload with the parameters', () => {
      expect(action.payload).toBeDefined();
      expect(action.payload.location).toBe(LOCATION);
      expect(action.payload.route).toBe(ROUTE);
      expect(action.payload.params).toBe(PARAMS);
      expect(action.payload.searchParams).toBe(SEARCH_PARAMS);
    });
  });
});
