import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import SignInPage from '../SignInPage'
import SignUpPage from '../SignUpPage'

const WelcomePage = () => {
  return (
    <>Welcome Page
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </li>
      <SignInPage />
      <SignUpPage />
    </>
  )
}

export default WelcomePage