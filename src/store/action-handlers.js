export const handleSetAuthUser = (state, user) => {
  const nextState = state.set('currentUser', user)
  return nextState
}

export const handleSetAppMessage = (state, message) => {
  const nextState = state.set('appMessage', message)
  return nextState
}

export const handleSetIsFetchingData = (state, data) => {
  const { type, value } = data
  const fetchingData = { ...state.get('fetchingData'), [type]: value }
  const nextState = state.set('fetchingData', fetchingData)
  return nextState
}
