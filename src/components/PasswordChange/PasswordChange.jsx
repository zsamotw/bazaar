import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import { withFirebase } from '../Firebase'
import AppInput from '../AppInput'
import { SET_APP_MESSAGE } from '../../store/actions'

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  errorBar: {
    color: 'red'
  }
})

const PasswordChangeForm = props => {
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [error, setError] = useState({})

  const { register, handleSubmit, errors } = useForm()

  const classes = useStyles()

  const resetState = () => {
    setPasswordOne('')
    setPasswordTwo('')
    setError({})
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

  const onSubmit = () => {
    props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        resetState()
        props.setAppMessage({
          content: 'Password update successfully',
          type: 'success'
        })
      })
      .catch(err => {
        setError(err)
      })
  }

  return (
    <>
      <h3>Reset Password:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>{AppInput(passwordOneInputProps)}</div>
        <div>{AppInput(passwordTwoInputProps)}</div>
        <Button variant="contained" color="primary" type="submit" size="large">
          Reset
        </Button>

        <div className={classes.errorBar}>
          {error && <p>{error.message}</p>}
        </div>
      </form>
    </>
  )
}

const mapDispatchToState = dispatch => {
  return {
    setAppMessage: message => dispatch(SET_APP_MESSAGE({ payload: message }))
  }
}

export default withFirebase(
  connect(null, mapDispatchToState)(PasswordChangeForm)
)
