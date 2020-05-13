import { createAction } from '@reduxjs/toolkit'

export const addAuthUser = createAction('add auth user', user => user)
