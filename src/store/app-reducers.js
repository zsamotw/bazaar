import { createReducer } from '@reduxjs/toolkit'
import { Record } from 'immutable'
import { handleSetAuthUser, handleSetAppMessage } from './action-handlers'
import { SET_AUTH_USER, SET_APP_MESSAGE } from './actions'

const makeInitialState = Record({
  currentUser: null,
  appMessage: { content: '', type: null }
})

const initialState = makeInitialState()

const appReducers = createReducer(initialState, {
  [SET_AUTH_USER.type]: (state, action) => {
    return handleSetAuthUser(state, action.payload)
  },
  [SET_APP_MESSAGE.type]: (state, action) => {
    return handleSetAppMessage(state, action.payload)
  }
})

export default appReducers
