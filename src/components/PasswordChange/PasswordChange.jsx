import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import ButtonWithProgress from '../ButtonWithProgress'
import AppInput from '../AppInput'
import { CHANGE_USER_PASSWORD_REQUEST } from '../../store/actions'
import { getAuthUserFromLocalStorage } from '../LocalStorage'
import { getIsFetchingData } from '../../store/selectors'

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
  const { changePassword, isFetchingChangePasswordData } = props

  const [passwordOld, setPasswordOld] = useState('')
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, errors } = useForm()

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isFetchingChangePasswordData)
  }, [isFetchingChangePasswordData])

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
    const { email } = getAuthUserFromLocalStorage()
    changePassword(email, passwordOld, passwordOne, { setError })
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

function mapStateToProps(state) {
  const { isFetchingChangePasswordData } = getIsFetchingData(state)
  return { isFetchingChangePasswordData }
}

function mapDispatchToState(dispatch) {
  return {
    changePassword: (email, passwordOld, passwordNew, callbacks) =>
      dispatch(
        CHANGE_USER_PASSWORD_REQUEST({
          payload: { email, passwordOld, passwordNew, callbacks }
        })
      )
  }
}

export default connect(mapStateToProps, mapDispatchToState)(PasswordChangeForm)
