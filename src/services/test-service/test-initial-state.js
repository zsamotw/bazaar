import { Record, List } from 'immutable'

const currentUser = {
  displayName: 'tomasz',
  email: 't@t.com',
  emailVerified: false,
  isAnonymous: false,
  photoURL: null,
  providerId: 'firebase',
  uid: '000'
}

const makeInitialState = Record({
  currentUser,
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
  itemFilters: { query: '' },
  recipientTransactions: List([]),
  donorTransactions: List([])
})

const initialState = makeInitialState()

export { initialState, currentUser }
