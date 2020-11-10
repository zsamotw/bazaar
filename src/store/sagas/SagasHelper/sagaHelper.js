import { put } from 'redux-saga/effects'
import { SET_APP_MESSAGE, SET_IS_FETCHING_DATA } from '../../actions'

const isFetchingData = {
  isFetchingLoginData: 'isFetchingLoginData',
  isFetchingSignUpdData: 'isFetchingSignUpdData',
  isFetchingSignOutData: 'isFetchingSignOutData',
  isFetchingUpdateUserAccountData: 'isFetchingUpdateUserAccountData',
  isFetchingChangePasswordData: 'isFetchingChangePasswordData',
  isFetchingProcessItem: 'isFetchingProcessItem',
  isFetchingTransactions: 'isFetchingTransactions'
}

function* requestWithFetchingData(action, func, fetchingType, messageOnError) {
  yield put(
    SET_IS_FETCHING_DATA({
      payload: { type: fetchingType, value: true }
    })
  )
  try {
    yield func(action)
    yield put(
      SET_IS_FETCHING_DATA({
        payload: { type: fetchingType, value: false }
      })
    )
  } catch (err) {
    const payload = action ? action.payload : null
    const callbacks = payload ? payload.callbacks : null
    if (callbacks && callbacks.setError) {
      callbacks.setError(err)
    }
    yield put(
      SET_IS_FETCHING_DATA({
        payload: { type: fetchingType, value: false }
      })
    )
    if (messageOnError) {
      yield put(SET_APP_MESSAGE({ payload: messageOnError }))
    }
  }
}

export { isFetchingData, requestWithFetchingData }
