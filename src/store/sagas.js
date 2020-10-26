import { all } from 'redux-saga/effects'
import accountSagas from './sagas/accountSagas'
import itemsSagas from './sagas/itemsSagas'

export default function* rootSaga() {
  yield all([accountSagas(), itemsSagas()])
}
