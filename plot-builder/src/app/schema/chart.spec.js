import {validate} from '../../lib/validate'
import schema from './chart'

describe('schema', () => {
  it('should validate', () => {
    const data = {
      data: [],
      layout: {
        title: 'foo',
        showLegend: false
      }
    }

    return validate(schema, data).catch(err => {
      console.log(err.errors)
      return Promise.reject(err)
    })
  })
})
