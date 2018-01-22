// @flow

/** @jsx h */

import {Router} from 'express'
import layout from 'layout'
import {h} from 'preact'
import {Provider} from 'preact-redux'
import {render} from 'preact-render-to-string'
import {pushState, registerRoutes} from './store/location/actions'
import {createStore} from './store/server'
import style from './index.css'
import schema from './schema/chart'
import Root from './Root'

import type {$Request, $Response} from 'express'
import type {Config} from '../types'

export function create (config: Config) {
  const router = Router()
  const routes = {
    '/': 'Dashboard',
    '/chart/:id/edit': 'Editor'
  }

  router.get('/schema.json', (req: $Request, res: $Response) => {
    res.json(schema)
  })

  router.get('/chart/create', (req: $Request, res: $Response) => {
    res.redirect('/')
  })

  router.get('*', async (req: $Request, res: $Response) => {
    const store = createStore({
      apiUrl: 'http://localhost:3000/api',
      initialState: {}
    })

    store.dispatch(registerRoutes(routes))
    store.dispatch(pushState(req.path, req.query))

    const state = store.getState()

    res.send(
      layout({
        title: 'App',
        head: `<link rel="stylesheet" href="/${config.manifest['app.css']}">`,
        body: [
          `<div id="${style.root}" data-state="${encodeURIComponent(
            JSON.stringify(state)
          )}">${render(
            <Provider store={store}>
              <Root />
            </Provider>
          )}</div>`,
          '<script src="https://cdnjs.cloudflare.com/ajax/libs/json-editor/0.7.28/jsoneditor.min.js"></script>',
          `<script src="/${config.manifest['app.js']}"></script>`
        ].join('')
      })
    )
  })

  return router
}
