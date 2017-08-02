import React from 'react'
import { Redirect } from 'react-router-dom'
import curry from 'ramda/src/curry'

export const routeGuard = curry(
  (predicate, ComponentSuccess, redirectPath, user) => props =>
    predicate(user, props)
      ? React.createElement(ComponentSuccess, props)
      : <Redirect
          to={{
            pathname: redirectPath,
            state: { from: props.location }
          }}
        />
)

export const forNotLogged = routeGuard(
  ({ logStatus }) => logStatus !== 'LOGGED_IN'
)
export const forTempAndLogged = routeGuard(
  ({ logStatus }) => logStatus === 'LOGGED_IN' || logStatus === 'LOGGED_OUT'
)
export const forLoggedOnly = routeGuard(
  ({ logStatus }) => logStatus === 'LOGGED_IN'
)
