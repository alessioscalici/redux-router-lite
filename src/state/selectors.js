// @flow

import type { Location, RouterState } from '../flow-types';

type State = {};

let getRouterCustom = null;

// $FlowFixMe
const getRouterDefault = (state: State): RouterState => state.router;

export const setRouterSelector =
  (newSelector: (State) => RouterState): void => { getRouterCustom = newSelector; };

export const getRouter = (state: State): RouterState => (
  (getRouterCustom ?
    getRouterCustom(state) :
    getRouterDefault(state))
);

export const getLocation = (state: State): ?Location => getRouter(state).location;
export const getRoute = (state: State): string => getRouter(state).route;
export const getParams = (state: State): {} => getRouter(state).params;
export const getSearchParams = (state: State): {} => getRouter(state).searchParams;
