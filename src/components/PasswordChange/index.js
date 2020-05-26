import React, { useState } from 'react'
import { withFirebase } from '../Firebase'

const PasswordChangeForm = props => {
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [error, setError] = useState({})

  const resetState = () => {
    setPasswordOne('')
    setPasswordTwo('')
    setError({})
  }

  const onSubmit = event => {
    props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        resetState()
      })
      .catch(err => {
        setError(err)
      })

    event.preventDefault()
  }

  const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

  return (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={event => setPasswordOne(event.target.value)}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={event => setPasswordTwo(event.target.value)}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  )
}

export default withFirebase(PasswordChangeForm)
