import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import reducer from '../../store/app-reducers'
import rootSaga from '../../store/sagas'
import { initialState } from './test-initial-state'

function render(Component, { customState, ...renderOptions } = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
    preloadedState: customState || initialState
  })
  sagaMiddleware.run(rootSaga)

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return {
    ...rtlRender(Component, { wrapper: Wrapper, store, ...renderOptions }),
    store
  }
}

export * from '@testing-library/react'
export { render }
