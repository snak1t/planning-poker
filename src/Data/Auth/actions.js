import ifElse from 'ramda/src/ifElse'

import { setErrorMessage } from '../Error/reducer'
import socketTypes from '../../socket.constants'
import { postFetch, getFetch } from '../../utils/fetch'

export const addUserToStore = user => ({
  type: '[user] LOGIN_USER',
  payload: user
})

export const removeUserFromStore = _ => ({
  type: '[user] LOGOUT_USER'
})

export const addUnauthorizedUser = user => ({
  type: '[user] ADD_ANAUTHORIZED_USER',
  payload: user
})

export const enterRoom = payload => ({
  type: socketTypes.ENTER_ROOM,
  payload
})

const addUserToStoreAction = ifElse(
  user => user.error,
  ({ error }) => setErrorMessage(error),
  addUserToStore
)

export const loginUser = postFetch('/api/login', addUserToStoreAction)
export const registerUser = postFetch('/api/signup', addUserToStoreAction)

export const fetchUser = getFetch(
  '/api/user',
  ifElse(user => !user.login, removeUserFromStore, addUserToStore),
  {}
)
export const doLogout = getFetch(
  '/api/logout',
  ifElse(data => data.logout === true, removeUserFromStore, setErrorMessage),
  {}
)
