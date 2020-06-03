import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { withFirebase } from '../Firebase'
import { setAuthUserInLocalStorage } from '../LocalStorage'

import * as ROUTES from '../../constants/routes'
import { SET_AUTH_USER } from '../../store/actions'
import AppInput from '../AppInput'

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
  </div>
)

const useStyles = makeStyles({
  errorBar: {
    color: 'red'
  }
})

const SignInFormBase = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})

  const { register, handleSubmit, errors } = useForm()

  const history = useHistory()

  const classes = useStyles()

  const resetFormState = () => {
    setEmail('')
    setPassword('')
  }

  const onSubmit = () => {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(firebaseUser => {
        const currentUser = props.firebase.transformFirebaseUserToStateUser(
          firebaseUser.user
        )
        resetFormState()
        props.setAuthUser(currentUser)
        setAuthUserInLocalStorage(currentUser)
        history.push(ROUTES.HOME)
      })
      .catch(err => {
        setError(err)
      })
  }

  const emailInputProps = {
    id: 'email-input',
    label: 'Email',
    variant: 'outlined',
    name: 'email',
    value: email,
    onChange: event => setEmail(event.target.value),
    type: 'text',
    placeholder: 'Type your email...',
    register: register({
      required: 'Required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address'
      }
    }),
    error: errors.email
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
    register: register({ required: 'Required' }),
    error: errors.password
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>{AppInput(emailInputProps)}</div>
      <div>{AppInput(passwordInputProps)}</div>
      <Button variant="contained" color="primary" type="submit" size="large">
        Sign In
      </Button>

      <div className={classes.errorBar}>{error && <p>{error.message}</p>}</div>
    </form>
  )
}

const mapDispatchToState = dispatch => {
  return {
    setAuthUser: authUser => dispatch(SET_AUTH_USER({ payload: authUser }))
  }
}

const SignInForm = connect(
  null,
  mapDispatchToState
)(withFirebase(SignInFormBase))

export { SignInForm, SignInPage }
