// @flow

import {combineReducers} from 'redux'
import chartReducer from './chart/reducer'
import locationReducer from './location/reducer'

export default combineReducers({
  chart: chartReducer,
  location: locationReducer
})
