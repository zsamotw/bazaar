import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import { getCurrentUser } from '../../store/selectors'
import AppInput from '../AppInput'
import { setAuthUserInLocalStorage } from '../LocalStorage'
import { withFirebase } from '../Firebase'
import { SET_AUTH_USER } from '../../store/actions'

const useStyles = makeStyles({
  errorBar: {
    color: 'red'
  }
})

function AccountDetailsChange(props) {
  const { currentUser } = props

  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState({})

  const { register, handleSubmit, errors } = useForm()

  const classes = useStyles()

  const onSubmit = () => {
    const loggedUser = props.firebase.doGetCurrentUser()
    loggedUser
      .updateProfile({
        displayName
      })
      .then(() => {
        const user = props.firebase.transformFirebaseUserToStateUser(loggedUser)
        props.setAuthUser(user)
        setAuthUserInLocalStorage(user)
      })
      .catch(err => {
        setError(err)
      })
  }

  const displayNameInputProps = {
    id: 'displayName-input',
    label: 'Display Name',
    variant: 'outlined',
    name: 'display-name',
    value: displayName,
    onChange: event => setDisplayName(event.target.value),
    type: 'text',
    placeholder: 'Type your email...',
    register: register({
      required: 'Required'
    }),
    error: errors.email
  }

  useEffect(() => {
    setDisplayName(currentUser.displayName)
  }, [currentUser])

  return (
    <>
      <h3>Account details:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>{AppInput(displayNameInputProps)}</div>
        <Button variant="contained" color="primary" type="submit" size="large">
          Save
        </Button>
        <div className={classes.errorBar}>
          {error && <p>{error.message}</p>}
        </div>
      </form>
    </>
  )
}

function mapStateToProps(state) {
  const currentUser = getCurrentUser(state)
  return { currentUser }
}

const mapDispatchToState = dispatch => {
  return {
    setAuthUser: authUser => dispatch(SET_AUTH_USER({ payload: authUser }))
  }
}

export default withFirebase(
  connect(mapStateToProps, mapDispatchToState)(AccountDetailsChange)
)
