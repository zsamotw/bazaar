import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './store/store'
import { theme } from './constants/theme'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store.store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
