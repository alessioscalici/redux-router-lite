
// eslint-disable-next-line import/no-extraneous-dependencies
import { isFSA } from 'flux-standard-action';

import type { Action } from 'flux-standard-action';
import type { Location } from '../src/flow-types';

import { SET_LOCATION, setLocation } from '../src/state/actions';


describe('router/actions', () => {
  describe('setLocation', () => {
    const LOCATION: Location = {
      hash: '',
      key: '',
      pathname: '/just/random/path',
      search: '',
    };
    const ROUTE = 'fakeRouteName';
    const PARAMS = {};
    const SEARCH_PARAMS = {};

    let action: Action<string, any, any>;

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
