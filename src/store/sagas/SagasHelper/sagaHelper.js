import { put } from 'redux-saga/effects'
import { SET_APP_MESSAGE, SET_IS_FETCHING_DATA } from '../../actions'

export default function* requestWithFetchingData(
  action,
  func,
  fetchingType,
  messageOnError
) {
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
    const { callbacks } = action
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
