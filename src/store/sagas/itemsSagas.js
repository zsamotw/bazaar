import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  SET_APP_MESSAGE,
  SET_ITEMS,
  ADD_ITEM_REQUEST,
  GET_ITEMS_REQUEST
} from '../actions'
import Firebase from '../../components/Firebase'
import { getCurrentUser } from '../selectors'
import requestWithFetchingData from './SagasHelper'

function* addFirebaseItem(action) {
  const { name, description, price } = action.payload
  const currentUser = yield select(getCurrentUser)
  const seller = Firebase.transformStateUserToSafeUser(currentUser)

  yield call(Firebase.addDocument, 'items', {
    name,
    description,
    price,
    seller
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

function* addItem(action) {
  const messageOnError = {
    content: 'Item adding failed',
    status: 'error'
  }
  yield requestWithFetchingData(
    action,
    addFirebaseItem,
    'isFetchingProcessItem',
    messageOnError
  )
}

function* getItems(action) {
  const messageOnError = {
    content: 'Getting items list failed',
    status: 'error'
  }
  yield requestWithFetchingData(
    action,
    getFirebaseItems,
    'isFetchingProcessItem',
    messageOnError
  )
}

export default function* itemsSaga() {
  yield takeLatest(ADD_ITEM_REQUEST.type, addItem)
  yield takeLatest(GET_ITEMS_REQUEST.type, getItems)
}
