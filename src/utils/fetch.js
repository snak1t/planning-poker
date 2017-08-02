import curry from 'ramda/src/curry'
import axios from 'axios'

const performFetchWithDispatch = curry(
  (method, url, action, data, dispatch) => {
    axios({
      method,
      url,
      data,
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.data)
      .then(action)
      .then(dispatch)
      .catch(console.error)
  }
)

export const postFetch = performFetchWithDispatch('POST')
export const putFetch = performFetchWithDispatch('PUT')
export const deleteFetch = performFetchWithDispatch('DELETE')
export const getFetch = performFetchWithDispatch('GET')
