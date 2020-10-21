import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RE_LOGIN_REQUEST } from '../../store/actions'
import { getCurrentUser } from '../../store/selectors'
import { getAuthUserFromLocalStorage } from '../LocalStorage'

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const { reLogin, currentUser } = props

    useEffect(() => {
      const authUserFromStorage = getAuthUserFromLocalStorage()
      if (authUserFromStorage) {
        reLogin()
      }
    }, [])

    return <Component {...props} />
  }

  function mapStateToProps(state) {
    const currentUser = getCurrentUser(state)
    return { currentUser }
  }

  function mapDispatchToState(dispatch) {
    return {
      reLogin: () => dispatch(RE_LOGIN_REQUEST())
    }
  }

  return connect(mapStateToProps, mapDispatchToState)(WithAuthentication)
}

export default withAuthentication
