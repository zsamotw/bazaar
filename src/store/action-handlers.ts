import { AppState } from '../models/AppState';
import { User } from '../models/User';
import { Record } from 'immutable'

export const handleAddAuthUser = (state, user) => {
  const nextState = state.set('currentUser', user)
  return nextState
}
