import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import ButtonWithProgress from '../ButtonWithProgress'
import { withFirebase } from '../Firebase'
import AppInput from '../AppInput'
import { SET_APP_MESSAGE } from '../../store/actions'
import { getAuthUserFromLocalStorage } from '../LocalStorage'

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
  const [passwordOld, setPasswordOld] = useState('')
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [error, setError] = useState({})
  const [isLoading, setIsLading] = useState(false)

  const { register, handleSubmit, errors } = useForm()

  const classes = useStyles()

  const resetState = () => {
    setPasswordOld('')
    setPasswordOne('')
    setPasswordTwo('')
    setError({})
  }

  const passwordOldInputProps = {
    id: 'passwordOld-input',
    label: 'Old Password',
    variant: 'outlined',
    name: 'passwordOld',
    value: passwordOld,
    onChange: event => setPasswordOld(event.target.value),
    type: 'password',
    placeholder: 'Type your old password...',
    register: register({
      required: 'Required',
      minLength: { value: 6, message: 'Password should have 6 letters' }
    }),
    error: errors.passwordOld
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
    register: register({
      required: 'Required',
      minLength: { value: 6, message: 'Password should have 6 letters' }
    }),
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
    register: register({
      required: 'Required',
      minLength: { value: 6, message: 'Password should have 6 letters' },
      validate: value =>
        value === passwordOne || 'Incorrect password confirmation'
    }),
    error: errors.passwordTwo
  }

  const onSubmit = () => {
    setIsLading(true)
    const { email } = getAuthUserFromLocalStorage()
    props.firebase
      .doSignInWithEmailAndPassword(email, passwordOld)
      .then(() => {
        props.firebase
          .doPasswordUpdate(passwordOne)
          .then(() => {
            resetState()
            props.setAppMessage({
              content: 'Password update successfully',
              type: 'success'
            })
            setIsLading(false)
          })
          .catch(err => {
            setError(err)
            setIsLading(false)
          })
      })
      .catch(err => {
        setError(err)
        setIsLading(false)
      })
  }

  return (
    <>
      <h3>Reset Password:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>{AppInput(passwordOldInputProps)}</div>
        <div>{AppInput(passwordOneInputProps)}</div>
        <div>{AppInput(passwordTwoInputProps)}</div>
        <ButtonWithProgress
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          text="Reset"
          isLoading={isLoading}
        />

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
