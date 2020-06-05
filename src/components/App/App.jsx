import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import * as ROUTES from '../../constants/routes'
import HomePage from '../HomePage'
import SignInPage from '../SignInPage'
import SignUpPage from '../SignUpPage'
import WelcomePage from '../WelcomePage'
import PrivateRoute from '../PrivateRoute'
import PublicRoute from '../PublicRoute'
import Alert from '../Alert'
import withAuthentication from '../Session'
import { getAppMessage } from '../../store/selectors'
import { SET_APP_MESSAGE } from '../../store/actions'

function App(props) {
  const [openSnackBar, setOpenSnackBar] = useState(false)

  const { appMessage } = props
  const { content: appMessageContent } = appMessage

  useEffect(() => {
    if (appMessageContent) {
      setOpenSnackBar(true)
    }
  }, [appMessageContent])

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false)
    props.setAppMessage({ content: '', type: null })
  }

  return (
    <div>
      <Router>
        <PublicRoute exact path={ROUTES.WELCOME} component={WelcomePage} />
        <PrivateRoute path={ROUTES.HOME} component={HomePage} />
        <PublicRoute path={ROUTES.SIGN_UP} component={SignUpPage} />
        <PublicRoute path={ROUTES.SIGN_IN} component={SignInPage} />
      </Router>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity={appMessage.status}>
          {appMessage.content}
        </Alert>
      </Snackbar>
    </div>
  )
}

const mapStateToProps = state => {
  const appMessage = getAppMessage(state)
  return { appMessage }
}

const mapDispatchToState = dispatch => {
  return {
    setAppMessage: message => dispatch(SET_APP_MESSAGE({ payload: message }))
  }
}

export default withAuthentication(
  connect(mapStateToProps, mapDispatchToState)(App)
)
