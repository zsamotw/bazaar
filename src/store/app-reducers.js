import { createReducer } from '@reduxjs/toolkit'
import {
  handleSetAuthUser,
  handleSetAppMessage,
  handleSetIsFetchingData,
  handleSetItems,
  handleSetRecipientTransactions,
  handleSetItemQueryFilter,
  handleSetSearchBarConfig
} from './action-handlers'
import {
  RESET_STATE,
  SET_AUTH_USER,
  SET_APP_MESSAGE,
  SET_IS_FETCHING_DATA,
  SET_ITEMS,
  SYNC_ITEMS,
  SET_TRANSACTIONS,
  SET_ITEM_QUERY_FILTER,
  SET_SEARCHBAR_CONFIG
} from './actions/sync-actions'
import initialState from './initial-state'

const appReducers = createReducer(initialState, {
  [RESET_STATE.type]: () => initialState,
  [SET_AUTH_USER.type]: (state, action) => {
    return handleSetAuthUser(state, action.payload)
  },
  [SET_APP_MESSAGE.type]: (state, action) => {
    return handleSetAppMessage(state, action.payload)
  },
  [SET_IS_FETCHING_DATA.type]: (state, action) => {
    return handleSetIsFetchingData(state, action.payload)
  },
  [SET_ITEMS.type]: (state, action) => {
    return handleSetItems(state, action.payload)
  },
  [SYNC_ITEMS.type]: (state, action) => {
    return handleSetItems(state, action.payload)
  },
  [SET_TRANSACTIONS.type]: (state, action) => {
    const { recipientTransactions, donorTransactions } = action.payload
    return handleSetRecipientTransactions(
      state,
      recipientTransactions,
      donorTransactions
    )
  },
  [SET_SEARCHBAR_CONFIG.type]: (state, action) => {
    return handleSetSearchBarConfig(state, action.payload)
  },
  [SET_ITEM_QUERY_FILTER.type]: (state, action) => {
    return handleSetItemQueryFilter(state, action.payload)
  }
})

export default appReducers
