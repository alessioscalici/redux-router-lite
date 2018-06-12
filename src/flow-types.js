// @flow
/* eslint no-undef : 0 */

import type { BrowserLocation, BrowserHistory } from 'history/createBrowserHistory';
import type { HashLocation, HashHistory } from 'history/createHashHistory';
import type { Store } from 'redux';
import type { FSA } from 'flux-standard-action';


// History related types
export type Location = BrowserLocation | HashLocation;
export type History = BrowserHistory | HashHistory;
export type HistoryMode = 'browser' | 'hash';


// Redux related types
export type AppStore = Store<{}, FSA>;


export type RouterState = {
  location: Location | null,
  route: string,
  params: {[string]: string},
  searchParams: {[string]: string},
};

export type GenericAction = FSA<?{}>;

export type SetLocationAction = FSA<{
  location: Location,
  route: string,
  params: {[string]: string},
  searchParams: {[string]: string},
}>;


// Router types

export type RouteConfig = {
  name: string,
  path: string,
};


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
