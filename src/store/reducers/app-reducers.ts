import { createReducer } from '@reduxjs/toolkit'
import { addAuthUser } from '../actions'
import { handleAddAuthUser } from '../action-handlers'
import { Record } from 'immutable'

const makeinitialState = Record({
  currentUser: null,
})

const initialState = makeinitialState()

const appReducers = createReducer(initialState, {
  [addAuthUser.type]: (state, action) => {
    return handleAddAuthUser(initialState, action.payload as any)
  },
})

export { appReducers }
