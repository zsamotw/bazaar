import { call, fork, put, takeLatest, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {
  SET_APP_MESSAGE,
  SYNC_ITEMS_CREATION,
  SET_TRANSACTIONS
} from '../actions/sync-actions'
import {
  ADD_ITEM_REQUEST,
  GET_ITEMS_REQUEST,
  SET_RECIPIENT_REQUEST,
  GET_TRANSACTIONS_REQUEST,
  REMOVE_ITEM_REQUEST
} from '../actions/async-actions'
import Firebase from '../../firebase'
import requestWithFetchingData from './SagasHelper'
import isAsyncRequest from '../../constants/asyncRequests'
import * as ROUTES from '../../constants/routes'

function* uploadFile(file, folder, messageOnFileUploadError) {
  try {
    const fileRef = Firebase.storageRef().child(`${folder}/${file.name}`)
    const task = Firebase.uploadFile(fileRef, file)
    const channel = eventChannel(emit => task.on('state_changed', emit))

    yield take(channel)
    yield task
  } catch {
    yield put(
      SET_APP_MESSAGE({
        content: messageOnFileUploadError,
        status: 'error'
      })
    )
  }
}

function* deleteFile(filePath, messageOnFileRemoveError) {
  try {
    const fileRef = Firebase.storageRef().child(filePath)

    yield call(Firebase.deleteFile, fileRef)
  } catch {
    yield put(
      SET_APP_MESSAGE({
        content: messageOnFileRemoveError,
        status: 'error'
      })
    )
  }
}

function* addFirebaseItem(action) {
  const {
    name,
    description,
    category,
    file,
    history,
    messageOnFileUploadError
  } = action.payload
  const currentUser = yield call(Firebase.getCurrentUser)
  const donor = Firebase.transformDbUserToSafeUser(currentUser)
  const createdAt = new Date()
  const folder = `images/${createdAt.getFullYear()}-${createdAt.getMonth()}/${createdAt.getTime()}`

  yield call(uploadFile, file, folder, messageOnFileUploadError)

  const imgStoragePath = `${folder}/${file.name}`
  const fileRef = Firebase.storageRef().child(imgStoragePath)
  const imgURL = yield call(Firebase.getDownloadURL, fileRef)

  yield call(Firebase.addDocument, 'items', {
    name,
    description,
    category,
    donor,
    imgStoragePath,
    imgURL,
    createdAt: createdAt.toString()
  })
  history.push(ROUTES.HOME)
}

function* removeFirebaseItem(action) {
  const {
    item,
    messageOnFileRemoveError,
    messageOnUserAccessError
  } = action.payload
  const { id, donor: itemDonor } = item
  const currentUser = yield call(Firebase.getCurrentUser)
  const donor = currentUser
  if (donor.uid === itemDonor.uid) {
    yield call(deleteFile, item.imgStoragePath, messageOnFileRemoveError)
    yield call(Firebase.removeDocument, `items/${id}`)
  } else {
    yield put(
      SET_APP_MESSAGE({
        content: messageOnUserAccessError,
        status: 'warring'
      })
    )
  }
}

function* setRecipient(action) {
  const {
    item: { id, recipient: itemRecipient, donor: itemDonor },
    messageOnUserSetRecipientAccessError
  } = action.payload
  const currentUser = yield call(Firebase.getCurrentUser)
  const recipient = Firebase.transformDbUserToSafeUser(currentUser)
  const takeAt = new Date().toString()

  if (!itemRecipient || recipient.uid === itemDonor.uid) {
    yield call(
      Firebase.setDocument,
      `items/${id}`,
      { recipient, takeAt },
      { merge: true }
    )
  } else {
    yield put(
      SET_APP_MESSAGE({
        content: messageOnUserSetRecipientAccessError,
        status: 'warring'
      })
    )
  }
}

function* getTransactions() {
  const currentUser = yield call(Firebase.getCurrentUser)
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
    yield put(SET_TRANSACTIONS({ recipientTransactions, donorTransactions }))
  }
}

function* addItemRequest(action) {
  yield requestWithFetchingData(
    action,
    addFirebaseItem,
    isAsyncRequest.isProcessingItem
  )
}

function* removeItemRequest(action) {
  yield requestWithFetchingData(
    action,
    removeFirebaseItem,
    isAsyncRequest.isProcessingItem
  )
}

function* getFirebaseSyncItems(action) {
  const { messageOnError } = action.payload
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
    yield put(SET_APP_MESSAGE({ content: messageOnError, status: 'error' }))
  }
}

function* setRecipientRequest(action) {
  yield requestWithFetchingData(
    action,
    setRecipient,
    isAsyncRequest.isProcessingItem
  )
}

function* getTransactionsRequest(action) {
  yield requestWithFetchingData(
    action,
    getTransactions,
    isAsyncRequest.isFetchingTransactions
  )
}

export default function* itemsSaga() {
  yield takeLatest(ADD_ITEM_REQUEST.type, addItemRequest)
  yield takeLatest(REMOVE_ITEM_REQUEST.type, removeItemRequest)
  yield takeLatest(GET_ITEMS_REQUEST.type, getFirebaseSyncItems)
  yield takeLatest(SET_RECIPIENT_REQUEST.type, setRecipientRequest)
  yield takeLatest(GET_TRANSACTIONS_REQUEST.type, getTransactionsRequest)
}
