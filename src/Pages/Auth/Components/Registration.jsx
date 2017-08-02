import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose as composeHOC } from 'recompose'

import '../styles.css'

import { registerUser } from '../../../Data/Auth/actions.js'
import {
  Input,
  FormGroup,
  Label,
  Button
} from '../../../Shared/Components/Controls'
import { AuthFormContainer, AuthFormTitle } from '../Styled.components'
import { withValidation } from 'rehoc-validator'
import { registrationValidationConfig } from './validators.config'
import { showErrorsForRegistrationComponent } from './helpers'

const mapDispatchToProps = {
  doRegistration: registerUser
}

const enhancer = composeHOC(
  withRouter,
  connect(null, mapDispatchToProps),
  withValidation(registrationValidationConfig)
)

export const RegistrationComponent = ({
  login,
  password,
  passwordConfirm,
  valid,
  doRegistration
}) => {
  const performRegistration = e => {
    e.preventDefault()
    doRegistration({
      login: login.value,
      password: password.value
    })
  }
  return (
    <AuthFormContainer>
      {showErrorsForRegistrationComponent(login, password, passwordConfirm)}
      <AuthFormTitle>Registration Component</AuthFormTitle>
      <form noValidate={true} onSubmit={performRegistration}>
        <FormGroup>
          <Label htmlFor="login">Login</Label>
          <Input
            id="login"
            type="text"
            placeholder="login"
            value={login.value}
            onChange={login.handler}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="password"
            value={password.value}
            onChange={password.handler}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="passwordConfirm">Password Confirmation</Label>
          <Input
            id="passwordConfirm"
            type="password"
            placeholder="password confirmation"
            value={passwordConfirm.value}
            onChange={passwordConfirm.handler}
          />
        </FormGroup>
        <FormGroup>
          <Button disabled={!valid}>Register</Button>
        </FormGroup>
      </form>
    </AuthFormContainer>
  )
}

export default enhancer(RegistrationComponent)
