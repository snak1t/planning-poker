import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { registerUser } from './actions.js';

import { Input } from '../Controls/input';
import { FormGroup } from '../Controls/formgroup';
import { Label } from '../Controls/label';
import { Button } from '../Controls/Button';
import styles from './styles.css';
import { evolve, always } from 'ramda';

const updatePath = path => value => evolve({ [path]: always(value) });
const updatePassword = updatePath('password');
const updateLogin = updatePath('login');

export class RegistrationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };
  }

  handlePasswordChange(newPass) {
    this.setState(updatePassword(newPass));
  }

  handleLoginChange(newLogin) {
    this.setState(updateLogin(newLogin));
  }

  performRegistration(e) {
    e.preventDefault();
    this.props.doRegistration(
      {
        login: this.state.login,
        password: this.state.password
      },
      () => {
        this.props.history.replace('/');
      }
    );
  }

  render() {
    return (
      <div className={styles.form}>
        <h2 className={styles.formTitle}>Registration Component</h2>
        <form noValidate={true} onSubmit={e => this.performRegistration(e)}>
          <FormGroup>
            <Label htmlFor="login">Login</Label>
            <Input
              id="login"
              type="text"
              placeholder="login"
              value={this.state.login}
              onChange={e => this.handleLoginChange(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={e => this.handlePasswordChange(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button>Register</Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doRegistration: (credenetials, cb) => dispatch(registerUser(credenetials, cb))
});

export default withRouter(
  connect(null, mapDispatchToProps)(RegistrationComponent)
);
