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
  const fetchingData = { ...state.get('isAsyncRequest'), [type]: value }
  const nextState = state.set('isAsyncRequest', fetchingData)
  return nextState
}

export const handleSetItems = (state, items) => {
  const nextItems = List(items)
    .sortBy(item => new Date(item.createdAt))
    .reverse()
  const nextState = state.set('items', nextItems)
  return nextState
}

export const handleSetRecipientTransactions = (
  state,
  recipientTransactions,
  donorTransactions
) => {
  const nextRecipientTransactions = List(recipientTransactions)
    .sortBy(item => new Date(item.takeAt))
    .reverse()
  const nextDonorTransactions = List(donorTransactions)
    .sortBy(item => new Date(item.takeAt))
    .reverse()
  const nextState = state
    .set('recipientTransactions', nextRecipientTransactions)
    .set('donorTransactions', nextDonorTransactions)
  return nextState
}
