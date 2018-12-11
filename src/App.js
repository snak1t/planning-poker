import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Header from './Shared/Components/Header/Header';
import { AuthContainer } from './Pages/Auth';
import ErrorContainer from './Shared/Components/Error/Container';

import { fetchUser } from './Data/Auth/actions.js';
import './default.css';
import './app.css';
import { userType } from './Data/Auth/type.js';
import { forNotLogged, forLoggedOnly } from './utils/router.guards';
import { PageLayout } from './components/Layout';

// Async Page Components
const GamesContainer = React.lazy(() => import('./Pages/Games'));
const BoardContainer = React.lazy(() => import('./Pages/Board'));

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = {
    fetchUser,
};

const enhancer = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export function App({ fetchUser, user }) {
    useEffect(fetchUser, []);
    return (
        <Router>
            <PageLayout>
                {/* <Header /> */}
                {user.logStatus !== 'NOT_ASKED' ? (
                    <Suspense fallback={<div>loading ...</div>}>
                        <Route exact={true} path="/" render={forLoggedOnly(GamesContainer, '/auth/sign-in', user)} />
                        <Route path="/game/:user/:gameID" render={props => <BoardContainer {...props} />} />
                        <Route path="/auth" render={forNotLogged(AuthContainer, '/', user)} />
                    </Suspense>
                ) : null}
                <ErrorContainer />
            </PageLayout>
        </Router>
    );
}

App.propTypes = {
    user: userType,
    fetchUser: PropTypes.func.isRequired,
};

export default enhancer(App);
