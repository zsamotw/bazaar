import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { withFirebase } from '../Firebase'

import * as ROUTES from '../../constants/routes'
import { ADD_AUTH_USER } from '../../store/actions'

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
  </div>
)

const SignInFormBase = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})

  const history = useHistory()

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

  const isInvalid = password === '' || email === ''

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        type="password"
        placeholder="Password"
      />
      <button type="submit" disabled={isInvalid}>
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
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
