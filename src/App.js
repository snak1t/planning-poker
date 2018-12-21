import React, { useContext, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AuthContainer } from './Pages/Auth';
import { forNotLogged, forLoggedOnly } from './utils/router.guards';
import { PageLayout } from './components/Layout';

import './app.css';
import './default.css';
import { GamesProvider } from './Data/Games/GamesContext';
import { AuthContext, LOGIN_STATUS } from './Data/Auth/AuthContext';

// Async Page Components
const GamesContainer = React.lazy(() => import('./Pages/Games'));
const BoardContainer = React.lazy(() => import('./Pages/Board'));

export default function App() {
    const {
        user: { loginStatus },
    } = useContext(AuthContext);
    const isUserLoggedIn = loginStatus === LOGIN_STATUS.LOGGED_IN;
    return (
        <Router>
            <PageLayout>
                {loginStatus !== LOGIN_STATUS.NOT_ASKED ? (
                    <Suspense fallback={<div>loading ...</div>}>
                        <GamesProvider readyToFetch={isUserLoggedIn}>
                            <Route
                                exact={true}
                                path="/"
                                render={forLoggedOnly(GamesContainer, '/sign-in', { loginStatus })}
                            />
                            <Route path="/game/:user/:gameID" render={props => <BoardContainer {...props} />} />
                        </GamesProvider>
                        <Route path="/sign-in" render={forNotLogged(AuthContainer, '/', { loginStatus })} />
                    </Suspense>
                ) : null}
            </PageLayout>
        </Router>
    );
}
