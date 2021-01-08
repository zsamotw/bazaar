import { createAction } from '@reduxjs/toolkit'

export const RESET_STATE = createAction('RESET STATE')

export const SET_AUTH_USER = createAction('SET AUTH USER', currentUser => ({
  payload: currentUser
}))

export const SET_APP_MESSAGE = createAction('SET APP MESSAGE', message => ({
  payload: { ...message }
}))

export const SET_IS_FETCHING_DATA = createAction('IS FETCHING DATA', data => ({
  payload: { ...data }
}))

export const SET_ITEMS = createAction('SET ITEMS', items => ({
  payload: { ...items }
}))

export const SYNC_ITEMS = createAction('SYNC ITEMS')

export const SYNC_ITEMS_CREATION = items => SYNC_ITEMS(items)

export const SET_TRANSACTIONS = createAction(
  'SET TRANSACTIONS',
  transactions => ({ payload: { ...transactions } })
)

export const SET_ITEM_QUERY_FILTER = createAction(
  'SET ITEM QUERY FILTER',
  query => ({ payload: query })
)
