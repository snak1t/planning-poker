import curry from 'ramda/src/curry'
import { setErrorMessage } from '../Error/reducer'
import axios from 'axios'

const performFetch = curry((url, credentials) => dispatch => {
  axios
    .post(
      url,
      { ...credentials },
      {
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        }
      }
    )
    .then(response => {
      return response.data
    })
    .then(user => {
      if (user.error) throw new Error(user.error)
      return user
    })
    .then(user => {
      return dispatch(addUserToStore(user))
    })
    .catch(err => dispatch(setErrorMessage(err)))
})

export const loginUser = performFetch('/api/login')
export const registerUser = performFetch('/api/signup')

export const fetchUser = _ => dispatch => {
  axios
    .get('/api/user', {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => response.data)
    .then(data => {
      if (!data.login) throw new Error('user not logged in')
      return dispatch(addUserToStore(data))
    })
    .catch(err => {
      dispatch(removeUserFromStore())
    })
}

export const doLogout = () => dispatch => {
  axios
    .get('/api/logout', {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(r => r.data)
    .then(data => {
      if (data.logout === true) {
        dispatch(removeUserFromStore())
      }
    })
}

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
