// @flow

import Ajv from 'ajv'

export function validate (schema: any, data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const ajv = new Ajv()
    const v = ajv.compile(schema)

    if (v(data)) {
      resolve(data)
    } else {
      const err: any = new Error('Invalid data')
      err.errors = v.errors
      reject(err)
    }
  })
}
