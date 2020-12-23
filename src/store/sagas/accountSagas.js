import { call, put, takeLatest } from 'redux-saga/effects'
import {
  SET_APP_MESSAGE,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  SET_AUTH_USER,
  SET_IS_FETCHING_DATA,
  UPDATE_USER_ACCOUNT_DETAILS_REQUEST,
  CHANGE_USER_PASSWORD_REQUEST,
  DELETE_USER_REQUEST,
  RESET_STATE
} from '../actions'
import Firebase from '../../firebase'
import requestWithFetchingData from './SagasHelper'
import isAsyncRequest from '../../constants/asyncRequests'

function* signInWithFirebase(action) {
  const { email, password } = action.payload
  const { user } = yield call(
    Firebase.doSignInWithEmailAndPassword,
    email,
    password
  )
  const currentUser = Firebase.transformFirebaseUserToStateUser(user)
  yield put(SET_AUTH_USER({ payload: currentUser }))
}

function* signUpWithFirebase(action) {
  const { displayName, email, password } = action.payload
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
  }
}

function* updateFirebaseUserAccount(action) {
  const { displayName } = action.payload
  const loggedUser = yield call(Firebase.doGetCurrentUser)

  if (loggedUser) {
    yield call(loggedUser.updateProfile.bind(loggedUser), { displayName })
    yield call(
      Firebase.updateItemsUsersDisplayNameOnUpdateProfile,
      'items',
      loggedUser.uid,
      displayName
    )
    const currentUser = Firebase.transformFirebaseUserToStateUser(loggedUser)
    yield put(SET_AUTH_USER({ payload: currentUser }))
    yield put(
      SET_APP_MESSAGE({
        payload: {
          content: 'Account update successfully',
          status: 'success'
        }
      })
    )
  }
}

function* changeFirebasePassword(action) {
  const { email, passwordOld, passwordNew } = action.payload
  yield put(
    SET_IS_FETCHING_DATA({
      payload: {
        type: isAsyncRequest.isFetchingChangePasswordData,
        value: true
      }
    })
  )
  const { user } = yield call(
    Firebase.doSignInWithEmailAndPassword,
    email,
    passwordOld
  )
  if (user) {
    yield call(Firebase.doPasswordUpdate, passwordNew)
    yield put(
      SET_APP_MESSAGE({
        payload: {
          content: 'Password updated successfully',
          status: 'success'
        }
      })
    )
  }
}

function* deleteFirebaseUser() {
  const loggedUser = yield call(Firebase.doGetCurrentUser)
  if (loggedUser) {
    yield call(loggedUser.delete.bind(loggedUser))
    yield put(SET_AUTH_USER({ payload: null }))
  }
}

function* singInRequest(action) {
  yield requestWithFetchingData(
    action,
    signInWithFirebase,
    isAsyncRequest.isFetchingLoginData,
    null
  )
}

function* logoutRequest() {
  yield call(Firebase.doSignOut)
  yield put(RESET_STATE())
}

function* signUpRequest(action) {
  yield requestWithFetchingData(
    action,
    signUpWithFirebase,
    isAsyncRequest.isFetchingSignUpData,
    null
  )
}

function* updateUserAccountDetailsRequest(action) {
  const messageOnError = {
    content: 'Account update failed',
    status: 'error'
  }
  yield requestWithFetchingData(
    action,
    updateFirebaseUserAccount,
    isAsyncRequest.isFetchingUpdateUserAccountData,
    messageOnError
  )
}

function* changePasswordRequest(action) {
  const messageOnError = {
    content: 'Password update failed',
    status: 'error'
  }
  yield requestWithFetchingData(
    action,
    changeFirebasePassword,
    isAsyncRequest.isFetchingChangePasswordData,
    messageOnError
  )
}

function* deleteUserRequest(action) {
  yield requestWithFetchingData(
    action,
    deleteFirebaseUser,
    isAsyncRequest.isFetchingLoginData,
    null
  )
}

export default function* accountSaga() {
  yield takeLatest(LOGIN_REQUEST.type, singInRequest)
  yield takeLatest(LOGOUT_REQUEST.type, logoutRequest)
  yield takeLatest(SIGNUP_REQUEST.type, signUpRequest)
  yield takeLatest(
    UPDATE_USER_ACCOUNT_DETAILS_REQUEST.type,
    updateUserAccountDetailsRequest
  )
  yield takeLatest(CHANGE_USER_PASSWORD_REQUEST, changePasswordRequest)
  yield takeLatest(DELETE_USER_REQUEST.type, deleteUserRequest)
}
