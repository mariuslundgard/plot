// @flow

import {createUniqueId} from 'id'
import jsonSchemaDefaults from 'json-schema-defaults'
import schema from '../../schema/chart'

export function createChart () {
  const data = jsonSchemaDefaults(schema)

  return {
    type: 'chart/CREATE',
    id: createUniqueId(),
    data
  }
}

export function load (_id: string) {
  return {type: 'chart/LOAD', _id}
}

export function loadAll () {
  return {type: 'chart/LOAD_ALL'}
}
