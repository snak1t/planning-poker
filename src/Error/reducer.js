const SET_ERROR_MESSAGE = '[error] SET_ERROR_MESSAGE'

export default (state = null, { type, payload }) => {
  switch (type) {
    case SET_ERROR_MESSAGE:
      return payload
    default:
      return state
  }
}

export const setErrorMessage = error => ({
  type: SET_ERROR_MESSAGE,
  payload: error ? error.message || error : null
})
