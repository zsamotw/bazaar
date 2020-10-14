import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { getCurrentUser } from '../../store/selectors'
import AccountProfile from '../AccountProfile'
import * as ROUTES from '../../constants/routes'

import MenuAppBar from '../MenuAppBar'
import MainPage from '../MainPage'

const HomePage = props => {
  const { currentUser } = props
  const { path } = useRouteMatch()

  return (
    <>
      <MenuAppBar currentUser={currentUser} />
      <Switch>
        <Route exact path={path}>
          <MainPage />
        </Route>
        <Route path={`${path}${ROUTES.ACCOUNT}`}>
          <AccountProfile />
        </Route>
        <Route path={path}>
          <MainPage />
        </Route>
      </Switch>
    </>
  )
}

function mapStateToProps(state) {
  const currentUser = getCurrentUser(state)
  return { currentUser }
}

export default connect(mapStateToProps)(HomePage)
