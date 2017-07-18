import { curry } from 'ramda'

const fetch = window.fetch

const performFetchWithDispatch = curry(
  (method, url, action, data, dispatch) => {
    fetch(url, {
      method,
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(action)
      .then(dispatch)
      .catch(console.error)
  }
)

export const postFetch = performFetchWithDispatch('POST')
export const putFetch = performFetchWithDispatch('PUT')
export const deleteFetch = performFetchWithDispatch('DELETE')
export const getFetch = performFetchWithDispatch('GET')
