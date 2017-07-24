import omit from 'ramda/src/omit'
import merge from 'ramda/src/merge'

const defaultState = {
  login: '',
  logStatus: 'NOT_ASKED' // 'NOT_ASKED', 'LOGGED_IN', 'LOGGED_OUT', 'TEMP_USER'
}

export const user = (state = defaultState, { type, payload }) => {
  switch (type) {
    case '[user] LOGOUT_USER':
      return merge(defaultState, { logStatus: 'LOGGED_OUT' })
    case '[user] LOGIN_USER':
      return merge({ logStatus: 'LOGGED_IN' }, extractUserInfo(payload))
    case '[user] ADD_ANAUTHORIZED_USER':
      return merge({ temporary: true, logStatus: 'LOGGED_IN' }, payload)
    default:
      return state
  }
}

const extractUserInfo = omit(['games'])
