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
import {
  withLogin,
  withPassword,
  handleLoginChange,
  handlePasswordChange
} from './helpers'
import { AuthFormContainer, AuthFormTitle } from '../Styled.components'

const mapDispatchToProps = {
  doRegistration: registerUser
}

const handlers = withHandlers({
  handleLoginChange,
  handlePasswordChange,
  performRegistration: ({ doRegistration, login, password, history }) => e => {
    e.preventDefault()
    doRegistration({ login, password })
  }
})

const enhancer = composeHOC(
  withRouter,
  connect(null, mapDispatchToProps),
  withLogin,
  withPassword,
  handlers
)

export const RegistrationComponent = ({
  performRegistration,
  login,
  handleLoginChange,
  password,
  handlePasswordChange
}) =>
  <AuthFormContainer>
    <AuthFormTitle>Registration Component</AuthFormTitle>
    <form noValidate={true} onSubmit={performRegistration}>
      <FormGroup>
        <Label htmlFor="login">Login</Label>
        <Input
          id="login"
          type="text"
          placeholder="login"
          value={login}
          onChange={handleLoginChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </FormGroup>
      <FormGroup>
        <Button>Register</Button>
      </FormGroup>
    </form>
  </AuthFormContainer>

export default enhancer(RegistrationComponent)
