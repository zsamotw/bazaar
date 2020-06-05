export const getCurrentUser = state => {
  const currentUser = state.get('currentUser')
  return currentUser
}

export const getAppMessage = state => {
  const message = state.get('appMessage')
  return message
}
