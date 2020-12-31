import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import ButtonWithProgress from '../../../components/ButtonWithProgress'
import { getIsAsyncRequest } from '../../../store/selectors'
import { SIGNUP_REQUEST } from '../../../store/actions'
import AppInput from '../../../components/AppInput'

const useStyles = makeStyles({
  errorBar: {
    color: 'red'
  }
})

const SignUpFormBase = props => {
  const { isFetchingSignUpData, signUp } = props

  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation('common')

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      displayName: '',
      email: '',
      passwordOne: '',
      passwordTwo: ''
    }
  })

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isFetchingSignUpData)
  }, [isFetchingSignUpData])

  const onSubmit = data => {
    const { displayName, email, passwordOne: password } = data
    signUp(displayName, email, password, {
      setError
    })
  }

  const userNameInputProps = {
    id: 'userName-input',
    label: t('signUpPage.inputs.userName.label'),
    variant: 'outlined',
    name: 'userName',
    type: 'text',
    placeholder: t('signUpPage.inputs.userName.placeholder'),
    register: register({
      required: t('signUpPage.inputs.userName.error.required')
    }),
    error: errors.userName,
    fullWidth: true
  }

  const emailInputProps = {
    id: 'email-input',
    label: t('signUpPage.inputs.email.label'),
    variant: 'outlined',
    name: 'email',
    type: 'text',
    placeholder: t('signUpPage.inputs.email.placeholder'),
    register: register({
      required: t('signUpPage.inputs.email.error.required'),
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: t('signUpPage.inputs.email.error.invalidPattern')
      }
    }),
    error: errors.email,
    fullWidth: true
  }
  const passwordOneInputProps = {
    id: 'passwordOne-input',
    label: t('signUpPage.inputs.passwordOne.label'),
    variant: 'outlined',
    name: 'passwordOne',
    value: passwordOne,
    onChange: event => setPasswordOne(event.target.value),
    type: 'password',
    placeholder: t('signUpPage.inputs.passwordOne.placeholder'),
    register: register({
      required: t('signUpPage.inputs.passwordOne.error.required'),
      minLength: {
        value: 6,
        message: t('signUpPage.inputs.passwordOne.error.invalid')
      }
    }),
    error: errors.passwordOne,
    fullWidth: true
  }

  const passwordTwoInputProps = {
    id: 'passwordTwo-input',
    label: t('signUpPage.inputs.passwordTwo.label'),
    variant: 'outlined',
    name: 'passwordTwo',
    value: passwordTwo,
    onChange: event => setPasswordTwo(event.target.value),
    type: 'password',
    placeholder: t('signUpPage.inputs.passwordTwo.placeholder'),
    register: register({
      required: t('signUpPage.inputs.passwordTwo.error.required'),
      minLength: {
        value: 6,
        message: t('signUpPage.inputs.passwordTwo.error.invalid')
      },
      validate: value =>
        value === passwordOne ||
        t('signUpPage.inputs.passwordTwo.error.incorrect')
    }),
    error: errors.passwordTwo,
    fullWidth: true
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {AppInput(userNameInputProps)}
      {AppInput(emailInputProps)}
      {AppInput(passwordOneInputProps)}
      {AppInput(passwordTwoInputProps)}
      <ButtonWithProgress
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        isLoading={isLoading}
        text={t('signUpPage.button')}
      />
      <div className={classes.errorBar}>{error && <p>{error.message}</p>}</div>
    </form>
  )
}

function mapStateToProps(state) {
  const { isFetchingSignUpData } = getIsAsyncRequest(state)
  return { isFetchingSignUpData }
}

function mapDispatchToState(dispatch) {
  return {
    signUp: (displayName, email, password, callbacks) =>
      dispatch(
        SIGNUP_REQUEST({ payload: { displayName, email, password, callbacks } })
      )
  }
}

const SignUpForm = connect(mapStateToProps, mapDispatchToState)(SignUpFormBase)

export default SignUpForm
