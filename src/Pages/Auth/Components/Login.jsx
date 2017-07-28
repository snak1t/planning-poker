import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose as composeHOC } from 'recompose'

import '../styles.css'

import { loginUser } from '../../../Data/Auth/actions.js'
import {
  Input,
  FormGroup,
  Label,
  Button
} from '../../../Shared/Components/Controls'
import { AuthFormContainer, AuthFormTitle } from '../Styled.components'
import { withValidation } from 'rehoc-validator'
import { loginValidationConfig } from './validators.config'
import { showErrorsForLoginComponent } from './helpers'

const mapDispatchToProps = {
  doLogin: loginUser
}

const enhancer = composeHOC(
  connect(null, mapDispatchToProps),
  withRouter,
  withValidation(loginValidationConfig)
)

export const LoginComponent = ({ doLogin, login, password, valid }) => {
  const performLogin = () =>
    doLogin({
      login: login.value,
      password: password.value
    })
  return (
    <AuthFormContainer>
      {showErrorsForLoginComponent(login, password)}
      <AuthFormTitle>Login Component</AuthFormTitle>
      <form noValidate={true} onSubmit={performLogin}>
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
          <Button disabled={!valid}>Do Login</Button>
        </FormGroup>
      </form>
    </AuthFormContainer>
  )
}
export default enhancer(LoginComponent)
