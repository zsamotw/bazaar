function getFilteredItems(items, state, collectionFromState) {
  const { query } = state.get('itemFilters')
  const { collection } = state.get('searchBarConfig')
  const lowerCaseQuery = query.toLowerCase()

  return items.filter(item =>
    lowerCaseQuery && collectionFromState === collection
      ? item.name.toLowerCase().includes(lowerCaseQuery) ||
        item.donor.displayName.toLowerCase().includes(lowerCaseQuery)
      : true
  )
}

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
  const items = state.get('items')
  return getFilteredItems(items, state, 'items')
}

export const getDonorTransactions = state => {
  const items = state.get('donorTransactions')
  return getFilteredItems(items, state, 'transactions')
}

export const getRecipientTransactions = state => {
  const items = state.get('recipientTransactions')
  return getFilteredItems(items, state, 'transactions')
}

export const getItemFilters = state => {
  const filters = state.get('itemFilters')
  return filters
}

export const getSearchBarConfig = state => {
  const searchBarConfig = state.get('searchBarConfig')
  return searchBarConfig
}
