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
