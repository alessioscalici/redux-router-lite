// @flow
/* eslint no-undef : 0 */

import type { BrowserLocation, BrowserHistory } from 'history/createBrowserHistory';
import type { HashLocation, HashHistory } from 'history/createHashHistory';
import type { Store } from 'redux';

export type RouteConfig = {
  name: string,
  path: string,
};

export type HistoryMode = 'browser' | 'hash';


export type Location = BrowserLocation | HashLocation;
export type History = BrowserHistory | HashHistory;
export type AppStore = Store<any, any>;

export type MatchedRoute = {
  routeId: string,
  params: {},
  searchParams: {},
};

export type CompiledRoute = RouteConfig & {
  re: RegExp,
  keys: Array<{ name: string }>,
  getPath: Function,
};

export type RouterConfig = {
  routes: Array<RouteConfig>,
  notFoundRoute: RouteConfig,
  mode: HistoryMode,
};

export type SetLocationAction = {
  type: string,
  payload: {
    location: Location,
    route: string,
    params: {[string]: string},
    searchParams: {[string]: string},
  }
};

export type RouterState = {
  location?: Location,
  route: string,
  params: {[string]: string},
  searchParams: {[string]: string},
};
