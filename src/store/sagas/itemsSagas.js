import { call, fork, put, select, takeLatest } from 'redux-saga/effects'
import {
  SET_APP_MESSAGE,
  ADD_ITEM_REQUEST,
  GET_ITEMS_REQUEST,
  SET_RECIPIENT_REQUEST,
  SYNC_ITEMS_CREATION
} from '../actions'
import Firebase from '../../components/Firebase'
import { getCurrentUser } from '../selectors'
import { isFetchingData, requestWithFetchingData } from './SagasHelper'

function* addFirebaseItem(action) {
  const { name, description } = action.payload
  const currentUser = yield select(getCurrentUser)
  const seller = Firebase.transformStateUserToSafeUser(currentUser)
  const createdAt = new Date()

  yield call(Firebase.addDocument, 'items', {
    name,
    description,
    seller,
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
  const currentUser = yield select(getCurrentUser)
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

export default function* itemsSaga() {
  yield takeLatest(ADD_ITEM_REQUEST.type, addItemRequest)
  yield takeLatest(GET_ITEMS_REQUEST.type, getFirebaseSyncItems)
  yield takeLatest(SET_RECIPIENT_REQUEST.type, setRecipientRequest)
}
