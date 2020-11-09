import { List } from 'immutable'

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
  const fetchingData = { ...state.get('isFetchingData'), [type]: value }
  const nextState = state.set('isFetchingData', fetchingData)
  return nextState
}

export const handleSetItems = (state, items) => {
  const nextItems = List(items)
    .sortBy(item => item.createdAt.seconds)
    .reverse()
  const nextState = state.set('items', nextItems)
  return nextState
}
