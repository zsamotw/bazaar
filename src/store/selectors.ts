import { Record } from 'immutable'

export const getCurrentUser = (state) => {
  const currentUser = state.get('currentUser')
  return  currentUser
}
