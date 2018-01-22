/* global __DEV__ */

/** @jsx h */

import {h, render} from 'preact'
import {Provider} from 'preact-redux'
import {createStore} from './store/client'
import style from './index.css'

if (__DEV__) {
  require('preact/devtools')
}

const rootElm = document.getElementById(style.root)
const rawState = rootElm.getAttribute('data-state')
const store = createStore({
  apiUrl: '/api',
  initialState: JSON.parse(decodeURIComponent(rawState))
})

function renderRoot () {
  const Root = require('./Root').default
  render(
    <Provider store={store}>
      <Root />
    </Provider>,
    rootElm,
    rootElm.firstChild
  )
}

if (__DEV__) {
  module.hot.accept('./Root', () => {
    renderRoot()
  })
}

renderRoot()
