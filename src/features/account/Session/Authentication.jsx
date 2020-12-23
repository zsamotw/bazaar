import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { SET_AUTH_USER } from '../../../store/actions'
import { getCurrentUser } from '../../../store/selectors'
import firebase from '../../../firebase'

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const { setAuthUser } = props

    useEffect(() => {
      const unsubscribe = firebase.onAuthUserListener(
        user => {
          setAuthUser(user)
        },

        () => {
          setAuthUser(null)
        }
      )
      return () => {
        unsubscribe()
      }
    })

    return <Component {...props} />
  }

  function mapStateToProps(state) {
    const currentUser = getCurrentUser(state)
    return { currentUser }
  }

  function mapDispatchToState(dispatch) {
    return {
      setAuthUser: authUser => dispatch(SET_AUTH_USER({ payload: authUser }))
    }
  }

  return connect(mapStateToProps, mapDispatchToState)(WithAuthentication)
}

export default withAuthentication
