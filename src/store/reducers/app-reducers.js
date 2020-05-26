import { createReducer } from '@reduxjs/toolkit'
import { Record } from 'immutable'
import { handleAddAuthUser } from '../action-handlers'
import { ADD_AUTH_USER } from '../actions'

const makeInitialState = Record({
  currentUser: null
})

const initialState = makeInitialState()

const appReducers = createReducer(initialState, {
  [ADD_AUTH_USER.type]: (state, action) => {
    return handleAddAuthUser(state, action.payload)
  }
})

export default appReducers
