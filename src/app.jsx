import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Header } from './Shared/Components/Header/Header'
import { AuthContainer } from './Pages/Auth/'
import GamesContainer from './Pages/Games/'
import BoardContainer from './Pages/Board/'
import ErrorContainer from './Shared/Components/Error/Container'

import { fetchUser } from './Data/Auth/actions.js'
import './default.css'
import styles from './app.css'
import { userType } from './Data/Auth/type.js'

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
  />

export class App extends React.Component {
  componentWillMount() {
    this.props.fetchUser()
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
              <Route path="/game/:user/:gameID" component={BoardContainer} />
            </main>}
          <ErrorContainer />
        </div>
      </Router>
    )
  }
}
App.propTypes = {
  user: userType,
  fetchUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = {
  fetchUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
