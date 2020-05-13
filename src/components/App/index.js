import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import SignInPage from '../SignInPage'
import SignUpPage from '../SignUpPage'
import Navigation from '../Navigation'

function App() {
  return (
    <div>
      <Router>
        <div>
          <Navigation />
          {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          {/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
          {/* <Route path={ROUTES.HOME} component={HomePage} /> */}
          {/* <Route path={ROUTES.ACCOUNT} component={AccountPage} /> */}
          {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
        </div>
      </Router>
    </div>
  )
}

export default App
