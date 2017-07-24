import { withState } from 'recompose'

export const withLogin = withState('login', 'setLogin', '')
export const withPassword = withState('password', 'setPassword', '')
export const handleLoginChange = ({ setLogin }) => ({ target: { value } }) =>
  setLogin(value)
export const handlePasswordChange = ({ setPassword }) => ({
  target: { value }
}) => setPassword(value)
