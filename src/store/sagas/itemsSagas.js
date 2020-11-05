import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  SET_APP_MESSAGE,
  SET_ITEMS,
  ADD_ITEM_REQUEST,
  GET_ITEMS_REQUEST
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

function* getFirebaseItems() {
  const snapshot = yield call(Firebase.getCollection, 'items')
  let items = []
  snapshot.forEach(item => {
    items = [...items, { ...item.data(), id: item.id }]
  })
  yield put(SET_ITEMS({ payload: items }))
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

function* getItemsRequest(action) {
  const messageOnError = {
    content: 'Getting items list failed',
    status: 'error'
  }
  yield requestWithFetchingData(
    action,
    getFirebaseItems,
    isFetchingData.isFetchingProcessItem,
    messageOnError
  )
}

export default function* itemsSaga() {
  yield takeLatest(ADD_ITEM_REQUEST.type, addItemRequest)
  yield takeLatest(GET_ITEMS_REQUEST.type, getItemsRequest)
}
