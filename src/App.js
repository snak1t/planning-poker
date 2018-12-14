import React, { useContext, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AuthContainer } from './Pages/Auth';
import { forNotLogged, forLoggedOnly } from './utils/router.guards';
import { PageLayout } from './components/Layout';
import { AuthContext } from './Data/Auth/AuthContext';

import './app.css';
import './default.css';

// Async Page Components
const GamesContainer = React.lazy(() => import('./Pages/Games'));
const BoardContainer = React.lazy(() => import('./Pages/Board'));

export default function App() {
    const user = useContext(AuthContext);
    return (
        <Router>
            <PageLayout>
                {user.logStatus !== 'NOT_ASKED' ? (
                    <Suspense fallback={<div>loading ...</div>}>
                        <Route exact={true} path="/" render={forLoggedOnly(GamesContainer, '/auth/sign-in', user)} />
                        <Route path="/game/:user/:gameID" render={props => <BoardContainer {...props} />} />
                        <Route path="/auth" render={forNotLogged(AuthContainer, '/', user)} />
                    </Suspense>
                ) : null}
            </PageLayout>
        </Router>
    );
}
