import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { getCurrentUser } from '../../store/selectors'
import AccountProfile from '../AccountProfile'
import * as ROUTES from '../../constants/routes'

import MenuAppBar from '../MenuAppBar'
import MainPage from '../MainPage'
import AddItem from '../AddItem'
import ItemsList from '../ItemsList'
import Transactions from '../Transactions'

const HomePage = props => {
  const { currentUser } = props
  const { path } = useRouteMatch()

  return (
    <div>
      <MenuAppBar currentUser={currentUser} />
      <Switch>
        <Route exact path={path}>
          {/* <ItemsList /> */}
          <MainPage />
        </Route>
        <Route path={`${path}${ROUTES.ACCOUNT}`}>
          <AccountProfile />
        </Route>
        <Route path={`${path}${ROUTES.ADD_ITEM}`}>
          <AddItem />
        </Route>
        <Route path={`${path}${ROUTES.ITEMS}`}>
          <ItemsList />
        </Route>
        <Route path={`${path}${ROUTES.TRANSACTIONS}`}>
          <Transactions />
        </Route>
        <Route path={path}>
          <MainPage />
        </Route>
      </Switch>
    </div>
  )
}

function mapStateToProps(state) {
  const currentUser = getCurrentUser(state)
  return { currentUser }
}

export default connect(mapStateToProps)(HomePage)
