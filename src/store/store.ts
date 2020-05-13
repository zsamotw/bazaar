import { configureStore } from '@reduxjs/toolkit'
import { appReducers } from './reducers/app-reducers'

const store = configureStore({ reducer: appReducers })

export default { store }