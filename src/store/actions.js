import { createAction } from '@reduxjs/toolkit'

export const RESET_STATE = createAction('RESET STATE')
export const SET_AUTH_USER = createAction('SET AUTH USER', user => user)
export const SET_APP_MESSAGE = createAction(
  'SET APP MESSAGE',
  message => message
)
export const SET_IS_FETCHING_DATA = createAction(
  'IS FETCHING DATA',
  data => data
)
export const SET_ITEMS = createAction('SET ITEMS', items => items)

export const SYNC_ITEMS = createAction('SYNC ITEMS')
export const SYNC_ITEMS_CREATION = items => SYNC_ITEMS(items)

export const SET_TRANSACTIONS = createAction('SET TRANSACTIONS', items => items)

export const SET_ITEM_QUERY_FILTER = createAction(
  'SET ITEM QUERY FILTER',
  query => ({ payload: query })
)

// account async actions
export const LOGIN_REQUEST = createAction(
  'LOGIN REQUEST',
  credential => credential
)
export const LOGOUT_REQUEST = createAction('LOGOUT REQUEST')
export const SIGNUP_REQUEST = createAction('SIGNUP REQUEST', data => data)
export const UPDATE_USER_ACCOUNT_DETAILS_REQUEST = createAction(
  'UPDATE_USER_ACCOUNT_DETAILS_REQUEST',
  data => data
)
export const CHANGE_USER_PASSWORD_REQUEST = createAction(
  'CHANGE_USER_PASSWORD_REQUEST',
  data => data
)
export const DELETE_USER_REQUEST = createAction(
  'DELETE USER REQUEST',
  credential => credential
)

// user items async actions
export const ADD_ITEM_REQUEST = createAction('ADD ITEM REQUEST', data => data)
export const REMOVE_ITEM_REQUEST = createAction(
  'REMOVE ITEM REQUEST',
  item => item
)
export const GET_ITEMS_REQUEST = createAction(
  'GET ITEMS REQUEST',
  message => message
)
export const SET_RECIPIENT_REQUEST = createAction(
  'SET RECIPIENT REQUEST',
  item => item
)
export const GET_TRANSACTIONS_REQUEST = createAction(
  'GET TRANSACTIONS REQUEST',
  message => message
)
