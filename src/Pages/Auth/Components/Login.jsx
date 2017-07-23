import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { compose as composeHOC, withState, withHandlers } from 'recompose'

import { loginUser } from '../../../Data/Auth/actions.js'

import { Input } from '../../../Shared/Components/Controls/Input'
import { FormGroup } from '../../../Shared/Components/Controls/Form.group'
import { Label } from '../../../Shared/Components/Controls/Label'
import { Button } from '../../../Shared/Components/Controls/Button'
import '../styles.css'

const withLogin = withState('login', 'setLogin', '')
const withPassword = withState('password', 'setPassword', '')

const handlers = withHandlers({
  handleLoginChange: ({ setLogin }) => ({ target: { value } }) =>
    setLogin(value),
  handlePasswordChange: ({ setPassword }) => ({ target: { value } }) =>
    setPassword(value),
  performLogin: ({ doLogin, login, password, history }) => e => {
    e.preventDefault()
    doLogin(
      {
        login,
        password
      },
      () => {
        history.replace('/')
      }
    )
  }
})

const mapDispatchToProps = dispatch => ({
  doLogin: (credenetials, cb) => dispatch(loginUser(credenetials, cb))
})

const enhancer = composeHOC(
  connect(null, mapDispatchToProps),
  withRouter,
  withLogin,
  withPassword,
  handlers
)

export const LoginComponent = ({
  performLogin,
  login,
  handleLoginChange,
  password,
  handlePasswordChange
}) =>
  <div className="form">
    <h2 className="formTitle">Login Component</h2>
    <form noValidate={true} onSubmit={performLogin}>
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
        <Button>Do Login</Button>
      </FormGroup>
    </form>
  </div>

export default enhancer(LoginComponent)
