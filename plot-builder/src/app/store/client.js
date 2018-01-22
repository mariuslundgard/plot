// @flow

import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import {applyMiddleware, createStore as createReduxStore} from 'redux'
import reducers from './reducers'

// Import middleware
import apiMiddleware from './api/middleware'
import chartMiddleware from './chart/middleware'
import locationMiddleware from './location/middleware'

import type {State} from './types'

type StoreOpts = {
  apiUrl: string | null,
  initialState: State
}

// Add PouchDB plugins
PouchDB.plugin(PouchDBFind)

export const createStore = (opts: StoreOpts) => {
  const {apiUrl, initialState} = opts
  const db = new PouchDB('chart')
  const store = createReduxStore(
    reducers,
    initialState,
    applyMiddleware(
      apiMiddleware(apiUrl),
      chartMiddleware(db),
      locationMiddleware()
    )
  )

  return store
}
