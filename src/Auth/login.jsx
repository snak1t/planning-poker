import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginUser } from './actions.js';
import { Input } from '../Controls/input';
import { FormGroup } from '../Controls/formgroup';
import { Label } from '../Controls/label';
import { Button } from '../Controls/Button';
import './styles.css';
import { evolve, always } from 'ramda';

export class LoginComponent extends React.Component {
  state = {
    login: '',
    password: ''
  };

  handlePasswordChange(newPass) {
    this.setState(evolve({ password: always(newPass) }));
  }

  handleLoginChange(newLogin) {
    this.setState(evolve({ login: always(newLogin) }));
  }
  performLogin(e) {
    e.preventDefault();
    this.props.doLogin(
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
      <div className="form">
        <h2 className="formTitle">Login Component</h2>
        <form noValidate={true} onSubmit={e => this.performLogin(e)}>
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
            <Button>Do Login</Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doLogin: (credenetials, cb) => dispatch(loginUser(credenetials, cb))
});

export default withRouter(connect(null, mapDispatchToProps)(LoginComponent));
