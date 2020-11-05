import { put } from 'redux-saga/effects'
import { SET_APP_MESSAGE, SET_IS_FETCHING_DATA } from '../../actions'

const isFetchingData = {
  isFetchingLoginData: 'isFetchingLoginData',
  isFetchingSignUpdData: 'isFetchingSignUpdData',
  isFetchingSignOutData: 'isFetchingSignOutData',
  isFetchingUpdateUserAccountData: 'isFetchingUpdateUserAccountData',
  isFetchingChangePasswordData: 'isFetchingChangePasswordData',
  isFetchingProcessItem: 'isFetchingProcessItem'
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
    const { callbacks } = action.payload
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