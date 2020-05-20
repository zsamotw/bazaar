import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import HomePage from '../HomePage'
import SignInPage from '../SignInPage'
import SignUpPage from '../SignUpPage'
import WelcomePage from '../WelcomePage'

function App() {
  return (
    <div>
      <Router>
        <Route exact path={ROUTES.WELCOME} component={WelcomePage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      </Router>
    </div>
  )
}

export default App
