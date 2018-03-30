
let getRouterCustom = null;

const getRouterDefault = state => state.router;

export const setRouterSelector = (newSelector) => { getRouterCustom = newSelector; };

export const getRouter = state => (
  (getRouterCustom ?
    getRouterCustom(state) :
    getRouterDefault(state)) || {}
);

export const getLocation = state => getRouter(state).location;
export const getRoute = state => getRouter(state).route;
export const getParams = state => getRouter(state).params;
export const getSearchParams = state => getRouter(state).searchParams;
