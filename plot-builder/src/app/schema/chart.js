// @flow

export default {
  type: 'object',
  title: 'Chart',
  required: ['data', 'layout'],
  properties: {
    data: {
      type: 'array',
      title: 'Data',
      items: {
        options: {
          keep_oneof_values: false
        },
        oneOf: [
          {
            type: 'object',
            title: 'Bar',
            required: ['type', 'name'],
            properties: {
              type: {
                type: 'string',
                enum: ['bar'],
                options: {
                  hidden: true
                }
              },
              name: {
                type: 'string'
              },
              x: {
                type: 'array',
                items: {
                  oneOf: [{type: 'number'}, {type: 'string'}]
                }
              },
              y: {
                type: 'array',
                items: {
                  oneOf: [{type: 'number'}, {type: 'string'}]
                }
              }
            }
          },
          {
            type: 'object',
            title: 'Column',
            required: ['type', 'name'],
            properties: {
              type: {
                type: 'string',
                enum: ['column'],
                options: {
                  hidden: true
                }
              },
              name: {
                type: 'string'
              }
            }
          },
          {
            type: 'object',
            title: 'Line',
            required: ['type', 'name'],
            properties: {
              type: {
                type: 'string',
                enum: ['line'],
                options: {
                  hidden: true
                }
              },
              name: {
                type: 'string'
              }
            }
          }
        ]
      }
    },
    layout: {
      type: 'object',
      title: 'Layout',
      required: ['title', 'showLegend'],
      properties: {
        title: {
          type: 'string',
          title: 'Title'
        },
        showLegend: {
          type: 'boolean',
          title: 'Show legend',
          default: true
          // format: 'checkbox'
        },
        margin: {
          type: 'object',
          properties: {
            top: {
              type: 'number',
              default: 0
            },
            right: {
              type: 'number',
              default: 0
            },
            bottom: {
              type: 'number',
              default: 0
            },
            left: {
              type: 'number',
              default: 0
            }
          }
        }
      }
    }
  }
}
