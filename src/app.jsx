import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Header } from './Header/header';
import { AuthContainer } from './Auth/container';
import GamesContainer from './Games/container';
import GameContainer from './Game/container';
import ErrorContainer from './Error/container';

import { fetchUser } from './Auth/actions.js';
import './default.css';
import styles from './app.css';
import { userType } from './Auth/type';

const PrivateRoute = ({ component, user, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      typeof user.login === 'undefined' || user.temporary
        ? <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: props.location }
            }}
          />
        : React.createElement(component, props)}
  />;

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <div className={styles.app}>
          <Header />
          {this.props.user &&
            <main>
              <PrivateRoute
                user={this.props.user}
                exact={true}
                path="/"
                component={GamesContainer}
              />
              <Route path="/auth" component={AuthContainer} />
              <Route path="/game/:user/:gameID" component={GameContainer} />
            </main>}
          <ErrorContainer />
        </div>
      </Router>
    );
  }
}
App.propTypes = {
  user: userType,
  fetchUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  fetchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
