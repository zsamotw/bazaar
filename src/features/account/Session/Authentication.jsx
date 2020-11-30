import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RE_LOGIN_REQUEST, SET_AUTH_USER } from '../../../store/actions'
import { getCurrentUser } from '../../../store/selectors'
import { getAuthUserFromLocalStorage } from '../../../services/local-storage-service'

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const { setAuthUser } = props

    useEffect(() => {
      const authUserFromStorage = getAuthUserFromLocalStorage()
      if (authUserFromStorage) {
        setAuthUser(authUserFromStorage)
      }
    }, [setAuthUser])

    return <Component {...props} />
  }

  function mapStateToProps(state) {
    const currentUser = getCurrentUser(state)
    return { currentUser }
  }

  function mapDispatchToState(dispatch) {
    return {
      reLogin: () => dispatch(RE_LOGIN_REQUEST()),
      setAuthUser: authUser => dispatch(SET_AUTH_USER({ payload: authUser }))
    }
  }

  return connect(mapStateToProps, mapDispatchToState)(WithAuthentication)
}

export default withAuthentication
