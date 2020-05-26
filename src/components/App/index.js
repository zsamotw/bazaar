import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import HomePage from '../HomePage'
import SignInPage from '../SignInPage'
import SignUpPage from '../SignUpPage'
import WelcomePage from '../WelcomePage'
import PrivateRoute from '../PrivateRoute'
import PublicRoute from '../PublicRoute'

function App() {
  return (
    <div>
      <Router>
        <PublicRoute exact path={ROUTES.WELCOME} component={WelcomePage} />
        <PrivateRoute path={ROUTES.HOME} component={HomePage} />
        <PublicRoute path={ROUTES.SIGN_UP} component={SignUpPage} />
        <PublicRoute path={ROUTES.SIGN_IN} component={SignInPage} />
      </Router>
    </div>
  )
}

export default App
