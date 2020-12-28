import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import ButtonWithProgress from '../../../components/ButtonWithProgress'
import { getIsAsyncRequest } from '../../../store/selectors'
import { LOGIN_REQUEST } from '../../../store/actions'
import AppInput from '../../../components/AppInput'

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
  const { isFetchingLoginData, login } = props

  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { email: '', password: '' }
  })

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isFetchingLoginData)
  }, [isFetchingLoginData])

  const onSubmit = data => {
    const { email, password } = data
    login(email, password, { setError })
  }

  const emailInputProps = {
    id: 'email-input',
    label: 'Email',
    variant: 'outlined',
    name: 'email',
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
    type: 'password',
    placeholder: 'Type your password...',
    register: register({
      required: 'Required',
      minLength: { value: 6, message: 'Password should have 6 letters' }
    }),
    error: errors.password
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {AppInput(emailInputProps)}
      {AppInput(passwordInputProps)}
      <ButtonWithProgress
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        isLoading={isLoading}
        text="Sign In"
      />
      <div className={classes.errorBar}>{error && <p>{error.message}</p>}</div>
    </form>
  )
}

function mapStateToProps(state) {
  const { isFetchingLoginData } = getIsAsyncRequest(state)
  return { isFetchingLoginData }
}

function mapDispatchToState(dispatch) {
  return {
    login: (email, password, callbacks) =>
      dispatch(LOGIN_REQUEST({ payload: { email, password, callbacks } }))
  }
}

const SignInForm = connect(mapStateToProps, mapDispatchToState)(SignInFormBase)

export { SignInForm, SignInPage }
