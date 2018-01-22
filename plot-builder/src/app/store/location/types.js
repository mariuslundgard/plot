// @flow

import type {Route, RouteMap} from 'route'

export type Query = {
  [key: string]: any
}

export type PushState = {
  type: 'location/PUSH_STATE',
  path: string,
  query?: Query
}
export type PopState = {type: 'location/POP_STATE', path: string, query?: Query}
export type RegisterRoutes = {
  type: 'location/REGISTER_ROUTES',
  routes: RouteMap
}
export type SetQueryParam = {
  type: 'location/SET_QUERY_PARAM',
  key: string,
  value: any
}
export type Action = PushState | PopState | RegisterRoutes | SetQueryParam

export type State = {
  path: string,
  query: Query,
  route: Route | null,
  routes: RouteMap
}
