import { call, put, takeLatest, all } from 'redux-saga/effects'
import {
  SET_APP_MESSAGE,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  SET_AUTH_USER,
  SET_IS_FETCHING_DATA,
  UPDATE_USER_ACCOUNT_DETAILS_REQUEST,
  CHANGE_USER_PASSWORD_REQUEST
} from './actions'
import Firebase from '../components/Firebase'

function* login(action) {
  yield put(
    SET_IS_FETCHING_DATA({
      payload: { type: 'isFetchingLoginData', value: true }
    })
  )
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
    yield put(
      SET_IS_FETCHING_DATA({
        payload: { type: 'isFetchingLoginData', value: false }
      })
    )
  } catch (error) {
    setError(error)
    yield put(
      SET_IS_FETCHING_DATA({
        payload: { type: 'isFetchingLoginData', value: false }
      })
    )
  }
}

function* logout(action) {
  const { callback } = action.payload
  yield call(Firebase.doSignOut)
  yield put(SET_AUTH_USER({ payload: null }))
  callback(null)
}

function* signUp(action) {
  yield put(
    SET_IS_FETCHING_DATA({
      payload: { type: 'isFetchingSignUpData', value: true }
    })
  )
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
      yield put(
        SET_IS_FETCHING_DATA({
          payload: { type: 'isFetchingSignUpData', value: false }
        })
      )
    }
  } catch (error) {
    setError(error)
    yield put(
      SET_IS_FETCHING_DATA({
        payload: { type: 'isFetchingSignUpData', value: false }
      })
    )
  }
}

function* updateUserAccountDetails(action) {
  yield put(
    SET_IS_FETCHING_DATA({
      payload: { type: 'isFetchingUpdateUserAccountData', value: true }
    })
  )
  const {
    displayName,
    callbacks: { setAuthUserInLocalStorage, setError }
  } = action.payload
  try {
    const loggedUser = yield call(Firebase.doGetCurrentUser)
    if (loggedUser) {
      yield call(loggedUser.updateProfile.bind(loggedUser), { displayName })
      const currentUser = Firebase.transformFirebaseUserToStateUser(loggedUser)
      yield put(SET_AUTH_USER({ payload: currentUser }))
      setAuthUserInLocalStorage(currentUser)
      yield put(
        SET_IS_FETCHING_DATA({
          payload: { type: 'isFetchingUpdateUserAccountData', value: false }
        })
      )
      yield put(
        SET_APP_MESSAGE({
          payload: {
            content: 'Account update successfully',
            status: 'success'
          }
        })
      )
    }
  } catch (error) {
    setError(error)
    yield put(
      SET_IS_FETCHING_DATA({
        payload: { type: 'isFetchingUpdateUserAccountData', value: false }
      })
    )
    yield put(
      SET_APP_MESSAGE({
        payload: {
          content: 'Account update failed',
          status: 'error'
        }
      })
    )
    setError(error)
  }
}

function* changePassword(action) {
  const {
    email,
    passwordOld,
    passwordNew,
    callbacks: { setError }
  } = action.payload
  yield put(
    SET_IS_FETCHING_DATA({
      payload: { type: 'isFetchingChangePasswordData', value: true }
    })
  )
  try {
    const { user } = yield call(
      Firebase.doSignInWithEmailAndPassword,
      email,
      passwordOld
    )
    if (user) {
      yield call(Firebase.doPasswordUpdate, passwordNew)
      yield put(
        SET_IS_FETCHING_DATA({
          payload: { type: 'isFetchingChangePasswordData', value: false }
        })
      )
      yield put(
        SET_APP_MESSAGE({
          payload: {
            content: 'Password updated successfully',
            status: 'success'
          }
        })
      )
    }
  } catch (error) {
    yield put(
      SET_IS_FETCHING_DATA({
        payload: { type: 'isFetchingChangePasswordData', value: false }
      })
    )
    yield put(
      SET_APP_MESSAGE({
        payload: {
          content: 'Password update failed',
          status: 'error'
        }
      })
    )
    setError(error)
  }
}

function* appSaga() {
  yield takeLatest(LOGIN_REQUEST.type, login)
  yield takeLatest(LOGOUT_REQUEST.type, logout)
  yield takeLatest(SIGNUP_REQUEST.type, signUp)
  yield takeLatest(
    UPDATE_USER_ACCOUNT_DETAILS_REQUEST.type,
    updateUserAccountDetails
  )
  yield takeLatest(CHANGE_USER_PASSWORD_REQUEST, changePassword)
}

export default function* rootSaga() {
  yield all([appSaga()])
}
