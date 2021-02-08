import { createAction } from '@reduxjs/toolkit'

// account async actions
export const LOGIN_REQUEST = createAction('LOGIN REQUEST', loginData => ({
  payload: { ...loginData }
}))

export const LOGOUT_REQUEST = createAction('LOGOUT REQUEST', logOutData => ({
  payload: { ...logOutData }
}))

export const SIGNUP_REQUEST = createAction('SIGNUP REQUEST', signUpData => ({
  payload: { ...signUpData }
}))

export const UPDATE_USER_ACCOUNT_DETAILS_REQUEST = createAction(
  'UPDATE_USER_ACCOUNT_DETAILS_REQUEST',
  userData => ({ payload: { ...userData } })
)

export const CHANGE_USER_PASSWORD_REQUEST = createAction(
  'CHANGE_USER_PASSWORD_REQUEST',
  passwordData => ({ payload: { ...passwordData } })
)

export const DELETE_USER_REQUEST = createAction(
  'DELETE USER REQUEST',
  deleteUserData => ({ payload: { ...deleteUserData } })
)

// user items async actions
export const CREATE_ITEM_REQUEST = createAction(
  'CREATE ITEM REQUEST',
  itemData => ({
    payload: { ...itemData }
  })
)

export const REMOVE_ITEM_REQUEST = createAction(
  'REMOVE ITEM REQUEST',
  removeItemData => ({ payload: { ...removeItemData } })
)

export const GET_ITEMS_REQUEST = createAction(
  'GET ITEMS REQUEST',
  messageOnError => ({ payload: { messageOnError } })
)

export const SET_RECIPIENT_REQUEST = createAction(
  'SET RECIPIENT REQUEST',
  itemData => ({ payload: { ...itemData } })
)

export const GET_TRANSACTIONS_REQUEST = createAction(
  'GET TRANSACTIONS REQUEST',
  messageOnError => ({ payload: { messageOnError } })
)
