// @flow

import createBrowserHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';
import pathToRegexp, { compile } from 'path-to-regexp';

// local
// eslint-disable-next-line no-unused-vars
import type { RouteConfig, HistoryMode, Location, History, AppStore, MatchedRoute, CompiledRoute, RouterConfig } from './index';

import { setLocation } from './state/actions';
import { deparam } from './utils';
import { getRouter } from './state/selectors';


// history
let history: ?History = null;
let store: ?AppStore = null;
let isTimeTraveling: boolean = false;

let routes: ?Array<CompiledRoute> = null;
let routeNotFound: ?RouteConfig = null;

export const getHistory = (): ?History => history;

export const setRoutes = (rts: Array<RouteConfig>) => {
  const cnt = rts.length;
  const enhancedRoutes: Array<CompiledRoute> = [];
  let keys;
  for (let i = 0; i < cnt; i += 1) {
    keys = [];
    const route = {
      ...rts[i],
      re: pathToRegexp(rts[i].path, keys),
      keys,
      getPath: compile(rts[i].path),
    };
    enhancedRoutes.push(route);
  }
  routes = enhancedRoutes;
  return enhancedRoutes;
};

export const matchRoute = (theRoutes: Array<CompiledRoute>, url: string): ?MatchedRoute => {
  for (let i = 0; i < theRoutes.length; i += 1) {
    const route = theRoutes[i];
    const match = route.re.exec(url);
    if (match) {
      const params = {};
      for (let j = 0; j < route.keys.length; j += 1) {
        params[route.keys[j].name] = match[j + 1];
      }
      return { routeId: route.name, params, searchParams: {} };
    }
  }
  return null;
};


// private funcs

export const setMode = (mode: HistoryMode): void => {
  if (mode === 'hash') {
    history = createHashHistory();
  } else {
    history = createBrowserHistory();
  }
};

export const isValidAction = (historyAction: string): boolean =>
  ['push', 'pop', 'replace'].indexOf(historyAction) >= 0;


export const routeToPath = (routeName: string, params: {}, searchParams: {}) => {
  const route = routes && routes.find(routeObj => routeObj.name === routeName);
  if (!route) {
    throw new Error(`Route "${routeName}" is not defined!`);
  }

  let url = route.getPath(params);

  if (searchParams) {
    const searchArr = [];
    Object.keys(searchParams).forEach((k) => {
      searchArr.push(`${encodeURIComponent(k)}=${encodeURIComponent(searchParams[k])}`);
    });
    url += `?${searchArr.join('&')}`;
  }
  return url;
};

export const gotoPath = (historyAction: string, path: string) => {
  if (history && isValidAction(historyAction)) {
    history[historyAction](path);
  }
};


export const gotoRoute = (routeName: string, params: {}, searchParams: {}) => {
  gotoPath('push', routeToPath(routeName, params, searchParams));
};


export const locationToRoute = (historyLocation: Location): ?MatchedRoute => {
  if (!routes) {
    return null;
  }
  let newRoute: ?string = null;
  let newParams = {};
  let searchParams = {};
  const match = matchRoute(routes, historyLocation.pathname);

  if (match) {
    newRoute = match.routeId;
    newParams = match.params;
    searchParams = deparam((historyLocation.search || '').replace(/^\?/, ''));
  } else {
    newRoute = routeNotFound && routeNotFound.name;
  }

  if (!newRoute) {
    return null;
  }

  return {
    routeId: newRoute,
    params: newParams,
    searchParams,
  };
};


export const configStore = (reduxStore: AppStore) => {
  store = reduxStore;


  const urlChangeHandler = (location: Location) => {
    if (!isTimeTraveling) {
      const parsedRoute = locationToRoute(location);
      if (parsedRoute && store) {
        store.dispatch(setLocation(
          location,
          parsedRoute.routeId,
          parsedRoute.params,
          parsedRoute.searchParams,
        ));
      }
    }
  };

  if (history != null && store != null) {
    history.listen(urlChangeHandler);
    urlChangeHandler(history.location);

    // align url with store changes
    store.subscribe(() => {
      if (history && store) {
        const rtr = getRouter(store.getState());
        if (rtr && history.location !== rtr.location) {
          isTimeTraveling = true;
          // $FlowFixMe - this will cause no harm, it's needed to handle both hash and browser modes
          history.replace(rtr.location);
          isTimeTraveling = false;
        }
      }
    });
  }
};


export const config = (reduxStore: AppStore, locConfig: RouterConfig): void => {
  setRoutes(locConfig.routes);
  routeNotFound = locConfig.notFoundRoute;
  setMode(locConfig.mode);
  configStore(reduxStore);
};
