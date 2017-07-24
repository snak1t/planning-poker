export const isUserLoggedIn = state => {
  return state.user.logStatus === 'LOGGED_IN'
}
