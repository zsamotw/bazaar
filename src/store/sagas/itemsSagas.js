import { call, fork, put, select, takeLatest } from 'redux-saga/effects'
import {
  SET_APP_MESSAGE,
  ADD_ITEM_REQUEST,
  GET_ITEMS_REQUEST,
  SET_RECIPIENT_REQUEST,
  SYNC_ITEMS_CREATION,
  GET_TRANSACTIONS_REQUEST,
  SET_TRANSACTIONS
} from '../actions'
import Firebase from '../../components/Firebase'
import { getCurrentUser } from '../selectors'
import { isFetchingData, requestWithFetchingData } from './SagasHelper'

function* addFirebaseItem(action) {
  const { name, description } = action.payload
  const currentUser = yield select(getCurrentUser)
  const donor = Firebase.transformStateUserToSafeUser(currentUser)
  const createdAt = new Date()

  yield call(Firebase.addDocument, 'items', {
    name,
    description,
    donor,
    createdAt
  })
  yield put(
    SET_APP_MESSAGE({
      payload: {
        content: 'Item has been added ',
        status: 'success'
      }
    })
  )
}

function* setRecipient(action) {
  const { id } = action.payload
  const currentUser = yield call(Firebase.doGetCurrentUser)
  const recipient = Firebase.transformStateUserToSafeUser(currentUser)
  const takeAt = new Date()

  yield call(
    Firebase.setDocument,
    `items/${id}`,
    { recipient, takeAt },
    { merge: true }
  )
  yield put(
    SET_APP_MESSAGE({
      payload: {
        content: 'Item has been taken ',
        status: 'success'
      }
    })
  )
}

function* getTransactions() {
  // const currentUser = yield call(Firebase.doGetCurrentUser)
  const currentUser = yield select(getCurrentUser)
  if (currentUser) {
    const snapshot = yield call(
      Firebase.getCollectionRef(),
      Firebase.getFirestoreCollectionOrder('items', 'createdAt')
    )
    let recipientTransactions = []
    let donorTransactions = []
    snapshot.forEach(item => {
      if (
        item.data().recipient &&
        item.data().recipient.uid === currentUser.uid
      ) {
        recipientTransactions = [
          ...recipientTransactions,
          { ...item.data(), id: item.id }
        ]
      }
      if (
        item.data().recipient &&
        item.data().donor &&
        item.data().donor.uid === currentUser.uid
      ) {
        donorTransactions = [
          ...donorTransactions,
          { ...item.data(), id: item.id }
        ]
      }
    })
    yield put(
      SET_TRANSACTIONS({
        payload: { recipientTransactions, donorTransactions }
      })
    )
  }
}

function* addItemRequest(action) {
  const messageOnError = {
    content: 'Item adding failed',
    status: 'error'
  }
  yield requestWithFetchingData(
    action,
    addFirebaseItem,
    isFetchingData.isFetchingProcessItem,
    messageOnError
  )
}

function* getFirebaseSyncItems() {
  const itemsTransformer = snapshot => {
    const items = []
    snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }))
    return items
  }

  try {
    yield fork(Firebase.syncCollectionRef(), 'items', {
      successActionCreator: SYNC_ITEMS_CREATION,
      transform: itemsTransformer
    })
  } catch {
    yield put(
      SET_APP_MESSAGE({
        payload: { content: 'Cannot sync items', status: 'error' }
      })
    )
  }
}

function* setRecipientRequest(action) {
  const messageOnError = {
    content: 'Taking item failed',
    status: 'error'
  }
  yield requestWithFetchingData(
    action,
    setRecipient,
    isFetchingData.isFetchingProcessItem,
    messageOnError
  )
}

function* getTransactionsRequest(action) {
  const messageOnError = {
    content: 'Getting transactions failed',
    status: 'error'
  }
  yield requestWithFetchingData(
    action,
    getTransactions,
    isFetchingData.isFetchingTransactions,
    messageOnError
  )
}

export default function* itemsSaga() {
  yield takeLatest(ADD_ITEM_REQUEST.type, addItemRequest)
  yield takeLatest(GET_ITEMS_REQUEST.type, getFirebaseSyncItems)
  yield takeLatest(SET_RECIPIENT_REQUEST.type, setRecipientRequest)
  yield takeLatest(GET_TRANSACTIONS_REQUEST.type, getTransactionsRequest)
}
