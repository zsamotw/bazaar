import React from 'react'
import { connect } from 'react-redux'
import { LOGOUT_REQUEST } from '../../store/actions'

const SignOutButton = ({ logout }) => (
  <button type="button" onClick={logout}>
    Sign Out
  </button>
)

const mapDispatchToState = dispatch => {
  return {
    logout: () => dispatch(LOGOUT_REQUEST())
  }
}

export default connect(null, mapDispatchToState)(SignOutButton)
