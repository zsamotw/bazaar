import { call, fork, put, select, takeLatest, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {
  SET_APP_MESSAGE,
  ADD_ITEM_REQUEST,
  GET_ITEMS_REQUEST,
  SET_RECIPIENT_REQUEST,
  SYNC_ITEMS_CREATION,
  GET_TRANSACTIONS_REQUEST,
  SET_TRANSACTIONS,
  REMOVE_ITEM_REQUEST
} from '../actions'
import Firebase from '../../firebase'
import { getCurrentUser } from '../selectors'
import requestWithFetchingData from './SagasHelper'
import isAsyncRequest from '../../constants/asyncRequests'
import * as ROUTES from '../../constants/routes'

function* uploadFile(file, folder) {
  try {
    const fileRef = Firebase.storageRef().child(`${folder}/${file.name}`)
    const task = Firebase.uploadFile(fileRef, file)
    const channel = eventChannel(emit => task.on('state_changed', emit))

    yield take(channel)
    yield task
  } catch {
    yield put(
      SET_APP_MESSAGE({
        payload: {
          content: 'Cannot upload file due to error',
          status: 'error'
        }
      })
    )
  }
}

function* deleteFile(filePath) {
  try {
    const fileRef = Firebase.storageRef().child(filePath)

    yield call(Firebase.deleteFile, fileRef)
  } catch {
    yield put(
      SET_APP_MESSAGE({
        payload: {
          content: 'Cannot delete file due to error',
          status: 'error'
        }
      })
    )
  }
}

function* addFirebaseItem(action) {
  const { name, description, category, file, history } = action.payload
  const currentUser = yield select(getCurrentUser)
  const donor = Firebase.transformStateUserToSafeUser(currentUser)
  const imgStoragePath = `images/${file.name}`
  const createdAt = new Date().toString()

  yield call(uploadFile, file, 'images')
  const fileRef = Firebase.storageRef().child(`images/${file.name}`)
  const imgURL = yield call(Firebase.getDownloadURL, fileRef)
  yield call(Firebase.addDocument, 'items', {
    name,
    description,
    category,
    donor,
    imgStoragePath,
    imgURL,
    createdAt
  })
  yield put(
    SET_APP_MESSAGE({
      payload: {
        content: 'Item has been added',
        status: 'success'
      }
    })
  )
  history.push(ROUTES.HOME)
}

function* removeFirebaseItem(action) {
  const { item } = action.payload
  const { id, donor: itemDonor } = item
  const currentUser = yield call(Firebase.doGetCurrentUser)
  const donor = Firebase.transformStateUserToSafeUser(currentUser)
  if (donor.uid === itemDonor.uid) {
    yield call(deleteFile, item.imgStoragePath)
    yield call(Firebase.removeDocument, `items/${id}`)
    yield put(
      SET_APP_MESSAGE({
        payload: {
          content: 'Item has been removed',
          status: 'success'
        }
      })
    )
  } else {
    yield put(
      SET_APP_MESSAGE({
        payload: {
          content: 'You cannot remove this item',
          status: 'warring'
        }
      })
    )
  }
}

function* setRecipient(action) {
  const {
    item: { id, recipient: itemRecipient, donor: itemDonor }
  } = action.payload
  const currentUser = yield call(Firebase.doGetCurrentUser)
  const recipient = Firebase.transformStateUserToSafeUser(currentUser)
  const takeAt = new Date().toString()

  if (!itemRecipient || recipient.uid === itemDonor.uid) {
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
  } else {
    yield put(
      SET_APP_MESSAGE({
        payload: {
          content: 'This item cannot be taken by You',
          status: 'warring'
        }
      })
    )
  }
}

function* getTransactions() {
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
    isAsyncRequest.isProcessingItem,
    messageOnError
  )
}

function* removeItemRequest(action) {
  const messageOnError = {
    content: 'Item removing failed',
    status: 'error'
  }
  yield requestWithFetchingData(
    action,
    removeFirebaseItem,
    isAsyncRequest.isProcessingItem,
    messageOnError
  )
}

function* getFirebaseSyncItems() {
  const itemsTransformer = snapshot => {
    const items = []
    snapshot.forEach(doc => {
      if (!doc.data().recipient) {
        items.push({ id: doc.id, ...doc.data() })
      }
    })
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
    isAsyncRequest.isProcessingItem,
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
    isAsyncRequest.isFetchingTransactions,
    messageOnError
  )
}

export default function* itemsSaga() {
  yield takeLatest(ADD_ITEM_REQUEST.type, addItemRequest)
  yield takeLatest(REMOVE_ITEM_REQUEST.type, removeItemRequest)
  yield takeLatest(GET_ITEMS_REQUEST.type, getFirebaseSyncItems)
  yield takeLatest(SET_RECIPIENT_REQUEST.type, setRecipientRequest)
  yield takeLatest(GET_TRANSACTIONS_REQUEST.type, getTransactionsRequest)
}
