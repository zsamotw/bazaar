import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { withFirebase } from '../Firebase'

import * as ROUTES from '../../constants/routes'
import { ADD_AUTH_USER } from '../../store/actions'

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
)

const SignUpFormBase = props => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [error, setError] = useState({})

  const history = useHistory()

  const resetState = () => {
    setUserName('')
    setEmail('')
    setPasswordOne('')
    setPasswordTwo('')
    setError({})
  }

  const onSubmit = event => {
    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        props.addAuthUser(authUser)
        resetState()
        history.push(ROUTES.HOME)
      })
      .catch(err => {
        setError(err)
      })

    event.preventDefault()
  }

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    userName === ''

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={userName}
        onChange={event => setUserName(event.target.value)}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={event => setPasswordOne(event.target.value)}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={event => setPasswordTwo(event.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit" disabled={isInvalid}>
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  )
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)

const mapDispatchToState = dispatch => {
  return {
    addAuthUser: authUser => dispatch(ADD_AUTH_USER({ payload: authUser })),
  }
}

const SignUpForm = connect(
  null,
  mapDispatchToState
)(withFirebase(SignUpFormBase))

export default SignUpPage

export { SignUpForm, SignUpLink }
