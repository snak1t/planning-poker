import React from 'react'
import { withState } from 'recompose'
import { ValidationErrors } from '../../../Shared/Components/Error/Validation.error'

export const withLogin = withState('login', 'setLogin', '')
export const withPassword = withState('password', 'setPassword', '')
export const handleLoginChange = ({ setLogin }) => ({ target: { value } }) =>
  setLogin(value)
export const handlePasswordChange = ({ setPassword }) => ({
  target: { value }
}) => setPassword(value)

const prepareErrorsForRegistration = (login, password, passwordConfirm) => [
  { title: 'Login', messages: login.errors },
  { title: 'Password', messages: password.errors },
  { title: 'Confirmation password', messages: passwordConfirm.errors }
]

const prepareErrorsForLogin = (login, password) => [
  { title: 'Login', messages: login.errors },
  { title: 'Password', messages: password.errors }
]

const prepareErrors = (type, values) =>
  type === 'registration'
    ? prepareErrorsForRegistration(...values)
    : prepareErrorsForLogin(...values)

const showErrorComponent = type => (...values) =>
  values.every(value => value.errors.length === 0)
    ? null
    : <ValidationErrors errors={prepareErrors(type, values)} />

export const showErrorsForRegistrationComponent = showErrorComponent(
  'registration'
)

export const showErrorsForLoginComponent = showErrorComponent('login')
