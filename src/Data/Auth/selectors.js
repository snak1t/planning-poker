export const isUserLoggedIn = state => {
  return state.user.logStatus === 'LOGGED_IN'
}

export const isAdmin = (state, userToMatch) =>
  state.user.logStatus === 'LOGGED_IN' && userToMatch === state.user.login
