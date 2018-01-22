// @flow

/** @jsx h */

import {Component, h} from 'preact'

type Props = {
  data: any,
  onChange: Function,
  schema: any
}

export default class Form extends Component<Props> {
  editor: any
  elm: HTMLFormElement

  componentDidMount () {
    const {data, onChange, schema} = this.props

    this.editor = new window.JSONEditor(this.elm, {schema, startval: data})
    this.editor.on('change', () => {
      // Validate the editor's current value against the schema
      const errors = this.editor.validate()

      if (errors.length) {
        // errors is an array of objects, each with a `path`, `property`, and `message` parameter
        // `property` is the schema keyword that triggered the validation error (e.g. "minLength")
        // `path` is a dot separated path into the JSON object (e.g. "root.path.to.field")
        console.log(errors)
      } else {
        if (onChange) {
          onChange(this.editor.getValue())
        }
      }
    })
  }

  render () {
    return <form ref={elm => (this.elm = elm)} />
  }
}
