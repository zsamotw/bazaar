import React from 'react'
import { Link } from 'react-router-dom'

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.WELCOME}>Welcome Page</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
)

export default Navigation
