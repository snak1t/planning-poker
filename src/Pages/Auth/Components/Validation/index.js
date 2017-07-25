import React from 'react'

export const withValidation = config => Component => {
  return class Validator extends React.Component {
    constructor(props) {
      super(props)
      const initState = {}
      for (let i in config) {
        initState[i] = { value: '', errors: [] }
      }
      this.state = initState
    }

    checkForErrors = (key, value) => {
      const validators = config[key].validators
      if (typeof validators === 'undefined') {
        return []
      }
      const errors = validators.reduce(
        (errors, { withFields, rule, message }) => {
          let valid = false
          if (withFields !== void 0) {
            valid = rule(value, ...withFields.map(key => this.state[key].value))
          } else {
            valid = rule(value)
          }
          return valid ? errors : [...errors, message]
        },
        []
      )
      return errors
    }

    valueHandler = key => ({ target: { value } }) => {
      const errors = this.checkForErrors(key, value)
      this.setState(prevState => {
        const prevStateSlice = { ...prevState[key], value, errors }
        return { ...prevState, [key]: prevStateSlice }
      })
    }

    isValidField = field => field.errors.length !== 0 || field.value === ''

    prepareProps = () => {
      const props = {}
      let valid = true
      for (let key in this.state) {
        if (this.isValidField(this.state[key])) {
          valid = false
        }
        props[key] = { ...this.state[key], handler: this.valueHandler(key) }
      }
      props.valid = valid
      return props
    }

    render() {
      return <Component {...this.props} {...this.prepareProps()} />
    }
  }
}
