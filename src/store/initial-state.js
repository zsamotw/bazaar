import { Record, List } from 'immutable'

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
  searchBarConfig: { isVisible: false, collection: '' },
  appMessage: { content: '', type: null },
  items: List([]),
  itemFilters: { query: '' },
  recipientTransactions: List([]),
  donorTransactions: List([])
})

const initialState = makeInitialState()

export default initialState
