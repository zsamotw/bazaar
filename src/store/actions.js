import { createAction } from '@reduxjs/toolkit'

export const SET_AUTH_USER = createAction('set auth user', user => user)
export const SET_APP_MESSAGE = createAction(
  'set app message',
  message => message
)
