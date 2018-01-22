// @flow

import type {Action, State} from './types'

const defaultState = {
  ids: [],
  current: null
}

function reducer (state: State = defaultState, action: Action) {
  switch (action.type) {
    // case 'chart/CREATE':
    //   return {
    //     ...state,
    //     current: {
    //       _id: action._id,
    //       type: 'chart',
    //       ...action.data
    //     }
    //   }

    case 'chart/LOAD_ALL_SUCCESS':
      return {
        ...state,
        ids: action.ids
      }

    case 'chart/LOAD_SUCCESS':
      return {
        ...state,
        current: action.chart
      }

    default:
      return state
  }
}

export default reducer
