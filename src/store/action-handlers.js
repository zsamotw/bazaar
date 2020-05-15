export const handleAddAuthUser = (state, user) => {
  const nextState = state.set('currentUser', user)
  return nextState
}
