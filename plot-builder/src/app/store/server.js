// @flow

import {applyMiddleware, createStore as createReduxStore} from 'redux'
import reducers from './reducers'

// Import middleware
import apiMiddleware from './api/middleware'

import type {State} from './types'

type StoreOpts = {
  apiUrl: string | null,
  initialState?: State
}

export const createStore = (opts: StoreOpts) => {
  const {apiUrl, initialState} = opts

  return createReduxStore(
    reducers,
    initialState,
    applyMiddleware(apiMiddleware(apiUrl))
  )
}
