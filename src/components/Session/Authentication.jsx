import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withFirebase } from '../Firebase'
import { SET_AUTH_USER } from '../../store/actions'
import { getAuthUserFromLocalStorage } from '../LocalStorage'

const withAuthentication = Component => {
  const WithAuthentication = props => {
    useEffect(() => {
      const authUserFromStorage = getAuthUserFromLocalStorage()

      if (authUserFromStorage) props.setAuthUser(authUserFromStorage)
    }, [props])

    return <Component {...props} />
  }

  const mapDispatchToState = dispatch => {
    return {
      setAuthUser: authUser => dispatch(SET_AUTH_USER({ payload: authUser }))
    }
  }

  return withFirebase(connect(null, mapDispatchToState)(WithAuthentication))
}

export default withAuthentication
