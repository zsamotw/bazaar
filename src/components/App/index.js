import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import SignInPage from '../SignInPage'
import SignUpPage from '../SignUpPage'
import Navigation from '../Navigation'
import HomePage from '../HomePage'
import WelcomePage from '../WelcomePage'

function App() {
  return (
    <div>
      <Router>
        <div>
          <Navigation />
          <Route exact path={ROUTES.WELCOME} component={WelcomePage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        </div>
      </Router>
    </div>
  )
}

export default App
