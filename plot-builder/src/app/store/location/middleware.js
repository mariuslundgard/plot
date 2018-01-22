// @flow

import qs from 'qs'

export default function locationMiddleware () {
  return (store: any) => {
    window.onpopstate = () => {
      const query = window.location.search.length
        ? qs.parse(window.location.search.substr(1))
        : {}
      store.dispatch({
        type: 'location/POP_STATE',
        path: window.location.pathname,
        query
      })
    }

    return (next: any) => (action: any) => {
      switch (action.type) {
        case 'location/PUSH_STATE':
          window.history.pushState(
            null,
            null,
            `${action.path}${
              action.query ? `?${qs.stringify(action.query)}` : ''
            }`
          )
          return next(action)

        case 'location/SET_QUERY_PARAM': {
          const {location} = store.getState()
          const query = location.query
            ? {...location.query, [action.key]: action.value}
            : {[action.key]: action.value}
          window.history.pushState(
            null,
            null,
            `${location.path}?${qs.stringify(query)}`
          )
          return next(action)
        }

        default:
          return next(action)
      }
    }
  }
}
