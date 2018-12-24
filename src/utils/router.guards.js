import React from 'react';
import { Redirect } from 'react-router-dom';
import curry from 'ramda/src/curry';

export const routeGuard = curry((predicate, ComponentSuccess, redirectPath, user) => props =>
    predicate(user, props) ? (
        React.createElement(ComponentSuccess, props)
    ) : (
        <Redirect
            to={{
                pathname: redirectPath,
                state: { from: props.location },
            }}
        />
    ),
);

export const forNotLogged = routeGuard(({ loginStatus }) => loginStatus !== 'LOGGED_IN');
export const forTempAndLogged = routeGuard(
    ({ loginStatus }) => loginStatus === 'LOGGED_IN' || loginStatus === 'LOGGED_OUT',
);
export const forLoggedOnly = routeGuard(({ loginStatus }) => loginStatus === 'LOGGED_IN');
