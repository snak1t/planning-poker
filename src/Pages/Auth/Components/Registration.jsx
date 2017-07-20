import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { registerUser } from '../../../Data/Auth/actions.js'

import { Input } from '../../../Shared/Components/Controls/Input'
import { FormGroup } from '../../../Shared/Components/Controls/Form.group'
import { Label } from '../../../Shared/Components/Controls/Label'
import { Button } from '../../../Shared/Components/Controls/Button'
import '../styles.css'
import evolve from 'ramda/src/evolve'
import always from 'ramda/src/always'

const updatePath = path => value => evolve({ [path]: always(value) })
const updatePassword = updatePath('password')
const updateLogin = updatePath('login')

export class RegistrationComponent extends React.Component {
  state = {
    login: '',
    password: ''
  }

  handlePasswordChange = ({ target: { value } }) =>
    this.setState(updatePassword(value))

  handleLoginChange = ({ target: { value } }) =>
    this.setState(updateLogin(value))

  performRegistration = e => {
    e.preventDefault()
    this.props.doRegistration(
      {
        login: this.state.login,
        password: this.state.password
      },
      () => {
        this.props.history.replace('/')
      }
    )
  }

  render() {
    return (
      <div className="form">
        <h2 className="formTitle">Registration Component</h2>
        <form noValidate={true} onSubmit={this.performRegistration}>
          <FormGroup>
            <Label htmlFor="login">Login</Label>
            <Input
              id="login"
              type="text"
              placeholder="login"
              value={this.state.login}
              onChange={this.handleLoginChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </FormGroup>
          <FormGroup>
            <Button>Register</Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  doRegistration: (credenetials, cb) => dispatch(registerUser(credenetials, cb))
})

export default withRouter(
  connect(null, mapDispatchToProps)(RegistrationComponent)
)
