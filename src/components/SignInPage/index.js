import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import { withFirebase } from '../Firebase'

import * as ROUTES from '../../constants/routes'
import { ADD_AUTH_USER } from '../../store/actions'
import AppInput from '../AppInput'

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
  </div>
)

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  errorBar: {
    color: 'red',
  },
})

const SignInFormBase = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})

  const history = useHistory()

  const classes = useStyles()

  const resetState = () => {
    setEmail('')
    setPassword('')
  }

  const onSubmit = event => {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        resetState()
        props.addAuthUser(authUser)
        history.push(ROUTES.HOME)
      })
      .catch(err => {
        setError(err)
      })

    event.preventDefault()
  }

  const isInvalid = !password || !email

  const emailInputProps = {
    id: 'email-input',
    label: 'Email',
    variant: 'outlined',
    name: 'email',
    value: email,
    onChange: event => setEmail(event.target.value),
    type: 'text',
    placeholder: 'Type your email...',
  }
  const passwordInputProps = {
    id: 'password-input',
    label: 'Password',
    variant: 'outlined',
    name: 'password',
    value: password,
    onChange: event => setPassword(event.target.value),
    type: 'password',
    placeholder: 'Type your password...',
  }

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      {AppInput(emailInputProps)}
      {AppInput(passwordInputProps)}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        disabled={isInvalid}
      >
        Sign In
      </Button>

      <div className={classes.errorBar}>{error && <p>{error.message}</p>}</div>
    </form>
  )
}

const mapDispatchToState = dispatch => {
  return {
    addAuthUser: authUser => dispatch(ADD_AUTH_USER({ payload: authUser })),
  }
}

const SignInForm = connect(
  null,
  mapDispatchToState
)(withFirebase(SignInFormBase))

export default SignInPage

export { SignInForm }
