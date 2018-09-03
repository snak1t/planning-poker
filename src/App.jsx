import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './Shared/Components/Header/Header';
import { AuthContainer } from './Pages/Auth/';
import GamesContainer from './Pages/Games/';
import BoardContainer from './Pages/Board/';
import ErrorContainer from './Shared/Components/Error/Container';

import { fetchUser } from './Data/Auth/actions.js';
import './default.css';
import './app.css';
import { userType } from './Data/Auth/type.js';
import { forNotLogged, forLoggedOnly } from './utils/router.guards';

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = {
    fetchUser,
};

const enhancer = connect(
    mapStateToProps,
    mapDispatchToProps
);

export class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        const { user } = this.props;
        return (
            <Router>
                <div className="app">
                    <Header />
                    {user.logStatus !== 'NOT_ASKED' ? (
                        <main>
                            <Route
                                exact={true}
                                path="/"
                                render={forLoggedOnly(
                                    GamesContainer,
                                    '/auth/login',
                                    user
                                )}
                            />
                            <Route
                                path="/game/:user/:gameID"
                                component={BoardContainer}
                            />
                            <Route
                                path="/auth"
                                render={forNotLogged(AuthContainer, '/', user)}
                            />
                        </main>
                    ) : null}
                    <ErrorContainer />
                </div>
            </Router>
        );
    }
}

App.propTypes = {
    user: userType,
    fetchUser: PropTypes.func.isRequired,
};

export default enhancer(App);
