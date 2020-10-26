import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  SET_APP_MESSAGE,
  SET_IS_FETCHING_DATA,
  ADD_ITEM_REQUEST
} from '../actions'
import Firebase from '../../components/Firebase'
import { getCurrentUser } from '../selectors'

function* addItem(action) {
  yield put(
    SET_IS_FETCHING_DATA({
      payload: { type: 'isFetchingProcessItem', value: true }
    })
  )
  const {
    name,
    description,
    price,
    callbacks: { setError }
  } = action.payload
  const currentUser = yield select(getCurrentUser)
  const seller = Firebase.transformStateUserToSafeUser(currentUser)
  try {
    yield call(Firebase.addItem, { name, description, price, seller })
    yield put(
      SET_APP_MESSAGE({
        payload: {
          content: 'Item has been added ',
          status: 'success'
        }
      })
    )
    yield put(
      SET_IS_FETCHING_DATA({
        payload: { type: 'isFetchingProcessItem', value: false }
      })
    )
  } catch (error) {
    setError(error)
    yield put(
      SET_IS_FETCHING_DATA({
        payload: { type: 'isFetchingProcessItem', value: false }
      })
    )
    yield put(
      SET_APP_MESSAGE({
        payload: {
          content: 'Item adding failed',
          status: 'error'
        }
      })
    )
  }
}

export default function* itemsSaga() {
  yield takeLatest(ADD_ITEM_REQUEST.type, addItem)
}
