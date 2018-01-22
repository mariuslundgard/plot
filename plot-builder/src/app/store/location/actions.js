// @flow

import type {RouteMap} from 'route'
import type {
  Query,
  PushState,
  PopState,
  RegisterRoutes,
  SetQueryParam
} from './types'

export function registerRoutes (routes: RouteMap): RegisterRoutes {
  return {type: 'location/REGISTER_ROUTES', routes}
}

export function pushState (path: string, query?: Query): PushState {
  return {type: 'location/PUSH_STATE', path, query}
}

export function popState (path: string, query?: Query): PopState {
  return {type: 'location/POP_STATE', path, query}
}

export function setQueryParam (key: string, value: any): SetQueryParam {
  return {type: 'location/SET_QUERY_PARAM', key, value}
}
