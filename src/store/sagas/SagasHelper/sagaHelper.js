import { put } from 'redux-saga/effects'
import { SET_APP_MESSAGE, SET_IS_FETCHING_DATA } from '../../actions'

export default function* requestWithFetchingData(action, func, fetchingType) {
  const { messageOnSuccess, messageOnError } = action.payload
  yield put(
    SET_IS_FETCHING_DATA({
      payload: { type: fetchingType, value: true }
    })
  )
  try {
    yield func(action)
    if (messageOnSuccess) {
      yield put(
        SET_APP_MESSAGE({
          payload: { content: messageOnSuccess, status: 'success' }
        })
      )
    }
  } catch (err) {
    const payload = action && action.payload
    const callbacks = payload && payload.callbacks
    if (callbacks && callbacks.setError) {
      callbacks.setError(err)
    }
    if (messageOnError) {
      yield put(
        SET_APP_MESSAGE({
          payload: { content: messageOnError, status: 'error' }
        })
      )
    }
  } finally {
    yield put(
      SET_IS_FETCHING_DATA({
        payload: { type: fetchingType, value: false }
      })
    )
  }
}
