// @flow

import {matchRoute} from 'route'

import type {Action, State} from './types'

const defaultState: State = {
  path: '/',
  query: {},
  route: null,
  routes: {}
}

export default function reducer (state: State = defaultState, action: Action) {
  switch (action.type) {
    case 'location/PUSH_STATE':
      return {
        ...state,
        path: action.path,
        query: action.query || {},
        route: matchRoute(action.path, state.routes)
      }

    case 'location/POP_STATE':
      return {
        ...state,
        path: action.path,
        query: action.query || {},
        route: matchRoute(action.path, state.routes)
      }

    case 'location/REGISTER_ROUTES':
      return {
        ...state,
        routes: action.routes
      }

    case 'location/SET_QUERY_PARAM':
      return {
        ...state,
        query: {...state.query, [action.key]: action.value}
      }

    default:
      return state || defaultState
  }
}
