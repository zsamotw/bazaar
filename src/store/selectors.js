export const getCurrentUser = state => {
  const currentUser = state.get('currentUser')
  return currentUser
}

export const getAppMessage = state => {
  const message = state.get('appMessage')
  return message
}

export const getIsAsyncRequest = state => {
  const isAsyncRequest = state.get('isAsyncRequest')
  return isAsyncRequest
}

export const getItems = state => {
  const { query } = state.get('itemFilters')
  const lowerCaseQuery = query.toLowerCase()
  const items = state
    .get('items')
    .filter(item =>
      query
        ? item.name.toLowerCase().includes(lowerCaseQuery) ||
          item.donor.displayName.toLowerCase().includes(lowerCaseQuery)
        : true
    )
  return items
}

export const getDonorTransactions = state => {
  const items = state.get('donorTransactions')
  return items
}

export const getRecipientTransactions = state => {
  const items = state.get('recipientTransactions')
  return items
}

export const getItemFilters = state => {
  const filters = state.get('itemFilters')
  return filters
}
