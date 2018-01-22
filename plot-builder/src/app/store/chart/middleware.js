// @flow

import type {Action} from './types'

export default function chartMiddleware (db: any) {
  db.createIndex({
    index: {fields: ['type', 'id']}
  })
  // .then(result => {
  //   console.log(result)
  // })

  return (store: any) => (next: any) => (action: Action) => {
    switch (action.type) {
      case 'chart/CREATE': {
        const {data, id} = action
        const ret = next(action)

        db
          .put({
            _id: new Date().toISOString(),
            type: 'chart',
            id,
            ...data
          })
          .then(() => {
            store.dispatch({
              type: 'location/PUSH_STATE',
              path: `/chart/${id}/edit`
            })
          })
          .catch(err => {
            console.error(err)
          })

        return ret
      }

      case 'chart/LOAD_ALL': {
        const ret = next(action)

        db.allDocs({include_docs: true}).then(result => {
          store.dispatch({
            type: 'chart/LOAD_ALL_SUCCESS',
            ids: result.rows
              .filter(d => d.doc.type === 'chart')
              .map(d => d.doc.id)
          })
        })

        return ret
      }

      case 'chart/LOAD': {
        const ret = next(action)

        db
          .find({
            selector: {type: {$eq: 'chart'}, id: {$eq: action.id}}
          })
          .then(result => {
            if (result.warning) {
              console.warn(`PouchDB: ${result.warning}`)
            }

            if (result.docs.length === 0) {
              store.dispatch({
                type: 'chart/LOAD_ERROR',
                error: 'Not found'
              })
            } else {
              store.dispatch({
                type: 'chart/LOAD_SUCCESS',
                chart: result.docs[0]
              })
            }
          })
          .catch(err => {
            store.dispatch({
              type: 'chart/LOAD_ERROR',
              error: err.message
            })
          })

        return ret
      }

      default:
        return next(action)
    }
  }
}
