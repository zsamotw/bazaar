import { createAction } from '@reduxjs/toolkit'

export const SET_AUTH_USER = createAction('set auth user', user => user)
export const SET_APP_MESSAGE = createAction(
  'set app message',
  message => message
)

export const LOGIN_REQUEST = createAction(
  'login request',
  credential => credential
)
export const LOGOUT_REQUEST = createAction(
  'logout request',
  callback => callback
)
export const SIGNUP_REQUEST = createAction('signup request', data => data)
