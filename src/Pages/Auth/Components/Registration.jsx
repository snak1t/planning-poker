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
  <div className="form">
    <h2 className="formTitle">Registration Component</h2>
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
  </div>

export default enhancer(RegistrationComponent)
