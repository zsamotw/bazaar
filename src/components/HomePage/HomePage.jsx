import React from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../store/selectors'

import MenuAppBar from '../MenuAppBar'

const HomePage = props => {
  const { currentUser } = props
  return (
    <div>
      <MenuAppBar currentUser={currentUser} />
    </div>
  )
}

function mapStateToProps(state) {
  const currentUser = getCurrentUser(state)
  return { currentUser }
}

export default connect(mapStateToProps)(HomePage)
