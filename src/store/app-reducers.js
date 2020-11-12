import { createReducer } from '@reduxjs/toolkit'
import { Record, List } from 'immutable'
import {
  handleSetAuthUser,
  handleSetAppMessage,
  handleSetIsFetchingData,
  handleSetItems,
  handleSetRecipientTransactions
} from './action-handlers'
import {
  SET_AUTH_USER,
  SET_APP_MESSAGE,
  SET_IS_FETCHING_DATA,
  SET_ITEMS,
  SYNC_ITEMS,
  SET_TRANSACTIONS
} from './actions'

const makeInitialState = Record({
  currentUser: null,
  isAsyncRequest: {
    isFetchingLoginData: false,
    isFetchingSignUpdData: false,
    isFetchingSignOutData: false,
    isFetchingUpdateUserAccountData: false,
    isFetchingChangePasswordData: false,
    isProcessingItem: false,
    isFetchingTransactions: false
  },
  appMessage: { content: '', type: null },
  items: List([]),
  recipientTransactions: List([]),
  donorTransactions: List([])
})

const initialState = makeInitialState()

const appReducers = createReducer(initialState, {
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
  }
})

export default appReducers
