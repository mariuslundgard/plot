// @flow

// import superagent from 'superagent'

export default function apiMiddleware (apiUrl: string | null) {
  // const makeRequest = path => superagent(`${apiUrl || ''}${path}`)

  return (store: any) => (next: any) => (action: any) => {
    switch (action.type) {
      // case 'module/LOAD':
      //   makeRequest(`/module/${action.name}`)
      //     .then(res => {
      //       if (res.statusCode >= 400) {
      //         store.dispatch({
      //           type: 'module/LOAD_ERROR',
      //           message: `Kunne ikke hente modulen «${action.name}»`
      //         })
      //       } else {
      //         const {_embedded, _links, ...meta} = res.body
      //         store.dispatch({
      //           type: 'module/LOAD_SUCCESS',
      //           meta,
      //           schema: _embedded.schema
      //         })
      //       }
      //     })
      //     .catch(() => {
      //       store.dispatch({
      //         type: 'module/LOAD_ERROR',
      //         message: `Kunne ikke hente modulen «${action.name}»`
      //       })
      //     })
      //   return next(action)
      //
      // case 'module/LOAD_ALL':
      //   makeRequest('/module')
      //     .then(res => {
      //       if (res.statusCode >= 400) {
      //         store.dispatch({
      //           type: 'module/LOAD_ALL_ERROR',
      //           message: 'Kunne ikke hente listen over moduler'
      //         })
      //       } else {
      //         store.dispatch({
      //           type: 'module/LOAD_ALL_SUCCESS',
      //           data: res.body._embedded.module
      //         })
      //       }
      //     })
      //     .catch(err => {
      //       store.dispatch({
      //         type: 'module/LOAD_ALL_ERROR',
      //         message: err.message
      //       })
      //     })
      //   return next(action)

      default:
        return next(action)
    }
  }
}
