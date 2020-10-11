import { call, put, takeLatest, select, all } from 'redux-saga/effects'
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  SET_AUTH_USER
} from './actions'
import Firebase from '../components/Firebase'

function* login(action) {
  const {
    email,
    password,
    callbacks: { setAuthUserInLocalStorage, setError }
  } = action.payload
  try {
    const { user } = yield call(
      Firebase.doSignInWithEmailAndPassword,
      email,
      password
    )
    const currentUser = Firebase.transformFirebaseUserToStateUser(user)
    yield put(SET_AUTH_USER({ payload: currentUser }))
    setAuthUserInLocalStorage(currentUser)
  } catch (error) {
    setError(error)
  }
}

function* logout(action) {
  const { callback } = action.payload
  yield call(Firebase.doSignOut)
  yield put(SET_AUTH_USER({ payload: null }))
  callback(null)
}

function* signUp(action) {
  const {
    displayName,
    email,
    password,
    callbacks: { setAuthUserInLocalStorage, setError }
  } = action.payload
  try {
    const user = yield call(
      Firebase.doCreateUserWithEmailAndPassword,
      email,
      password
    )
    if (user) {
      const loggedUser = yield call(Firebase.doGetCurrentUser)
      yield call(loggedUser.updateProfile.bind(loggedUser), { displayName })
      const currentUser = Firebase.transformFirebaseUserToStateUser(loggedUser)
      yield put(SET_AUTH_USER({ payload: currentUser }))
      setAuthUserInLocalStorage(currentUser)
    }
  } catch (error) {
    setError(error)
  }
}

function* appSaga() {
  yield takeLatest(LOGIN_REQUEST.type, login)
  yield takeLatest(LOGOUT_REQUEST.type, logout)
  yield takeLatest(SIGNUP_REQUEST.type, signUp)
}

export default function* rootSaga() {
  yield all([appSaga()])
}
