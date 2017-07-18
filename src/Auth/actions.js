import { curry } from 'ramda'
import { setErrorMessage } from '../Error/reducer'

const fetch = window.fetch

const performFetch = curry((url, credentials, cb) => dispatch => {
  fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(response => response.json())
    .then(user => {
      if (user.error) throw new Error(user.error)
      return user
    })
    .then(user => {
      return dispatch(addUserToStore(user))
    })
    .then(() => cb())
    .catch(err => dispatch(setErrorMessage(err)))
})

export const loginUser = performFetch('/api/login')
export const registerUser = performFetch('/api/signup')

export const fetchUser = _ => dispatch => {
  fetch('/api/user', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (!data.login) throw new Error('user not logged in')
      return dispatch(addUserToStore(data))
    })
    .catch(err => {
      console.log(err)
      dispatch(addUserToStore(null))
    })
}

export const addUserToStore = user => ({
  type: '[user] LOGIN_USER',
  payload: user
})

export const addUnauthorizedUser = user => ({
  type: '[user] ADD_ANAUTHORIZED_USER',
  payload: user
})
