import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { withFirebase } from '../Firebase'
import { setAuthUserInLocalStorage } from '../LocalStorage'

import * as ROUTES from '../../constants/routes'
import { SET_AUTH_USER } from '../../store/actions'
import AppInput from '../AppInput'

const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
  </div>
)

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  errorBar: {
    color: 'red'
  }
})

const SignUpFormBase = props => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [error, setError] = useState({})

  const { register, handleSubmit, errors } = useForm()

  const history = useHistory()

  const classes = useStyles()

  const resetFormState = () => {
    setDisplayName('')
    setEmail('')
    setPasswordOne('')
    setPasswordTwo('')
    setError({})
  }

  const onSubmit = () => {
    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(firebaseUser => {
        if (firebaseUser) {
          const loggedUser = props.firebase.doGetCurrentUser()
          loggedUser
            .updateProfile({
              displayName
            })
            .then(() => {
              resetFormState()
              const currentUser = props.firebase.transformFirebaseUserToStateUser(
                loggedUser
              )
              props.setAuthUser(currentUser)
              setAuthUserInLocalStorage(currentUser)
              history.push(ROUTES.HOME)
            })
        }
      })
      .catch(err => {
        setError(err)
      })
  }

  const userNameInputProps = {
    id: 'userName-input',
    label: 'User Name',
    variant: 'outlined',
    name: 'userName',
    value: displayName,
    onChange: event => setDisplayName(event.target.value),
    type: 'text',
    placeholder: 'Type your name...',
    register: register({
      required: 'Required'
    }),
    error: errors.userName
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
  const passwordOneInputProps = {
    id: 'passwordOne-input',
    label: 'Password',
    variant: 'outlined',
    name: 'passwordOne',
    value: passwordOne,
    onChange: event => setPasswordOne(event.target.value),
    type: 'password',
    placeholder: 'Type your password...',
    register: register({ required: 'Required' }),
    error: errors.passwordOne
  }
  const passwordTwoInputProps = {
    id: 'passwordTwo-input',
    label: 'Password Confirmation',
    variant: 'outlined',
    name: 'passwordTwo',
    value: passwordTwo,
    onChange: event => setPasswordTwo(event.target.value),
    type: 'password',
    placeholder: 'Confirm your password...',
    register: register({ required: 'Required' }),
    error: errors.passwordTwo
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {AppInput(userNameInputProps)}
      {AppInput(emailInputProps)}
      {AppInput(passwordOneInputProps)}
      {AppInput(passwordTwoInputProps)}
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

const SignUpForm = connect(
  null,
  mapDispatchToState
)(withFirebase(SignUpFormBase))

export { SignUpForm, SignUpPage }