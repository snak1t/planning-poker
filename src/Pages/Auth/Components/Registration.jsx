import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withHandlers, compose as composeHOC } from 'recompose'

import '../styles.css'

import { registerUser } from '../../../Data/Auth/actions.js'
import {
  Input,
  FormGroup,
  Label,
  Button
} from '../../../Shared/Components/Controls'
import { AuthFormContainer, AuthFormTitle } from '../Styled.components'
import { withValidation } from './Validation'

const mapDispatchToProps = {
  doRegistration: registerUser
}

const config = {
  login: {
    validators: [
      { rule: val => val.length > 3, message: 'Too short' },
      { rule: val => val.startsWith('sn'), message: 'Must start with sn' }
    ]
  },
  password: {
    validators: [
      {
        rule: val => val.length > 4,
        message: 'Password must be longer than 4 symbols'
      }
    ]
  },
  passwordConfirm: {
    validators: [
      {
        rule: (val, password) => val === password,
        message: 'Passwords not equal',
        withFields: ['password']
      }
    ]
  }
}

const enhancer = composeHOC(
  withRouter,
  connect(null, mapDispatchToProps),
  withValidation(config)
)

export class RegistrationComponent extends React.Component {
  performRegistration = e => {
    e.preventDefault()
    this.props.doRegistration({
      login: this.props.login.value,
      password: this.props.password.value
    })
  }

  displayErrors = key =>
    this.props[key].errors.length !== 0
      ? <div style={{ backgorundColor: 'red' }}>
          {this.props[key].errors.map((e, i) =>
            <div key={i}>
              {e}
            </div>
          )}
        </div>
      : null

  render() {
    return (
      <AuthFormContainer>
        <AuthFormTitle>Registration Component</AuthFormTitle>
        <form noValidate={true} onSubmit={this.performRegistration}>
          {this.displayErrors('login')}
          <FormGroup>
            <Label htmlFor="login">Login</Label>
            <Input
              id="login"
              type="text"
              placeholder="login"
              value={this.props.login.value}
              onChange={this.props.login.handler}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              value={this.props.password.value}
              onChange={this.props.password.handler}
            />
            {this.displayErrors('password')}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="passwordConfirm">Password Confirmation</Label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="password confirmation"
              value={this.props.passwordConfirm.value}
              onChange={this.props.passwordConfirm.handler}
            />
            {this.displayErrors('passwordConfirm')}
          </FormGroup>
          <FormGroup>
            {this.props.valid ? <Button>Register</Button> : null}
          </FormGroup>
        </form>
      </AuthFormContainer>
    )
  }
}

export default enhancer(RegistrationComponent)
