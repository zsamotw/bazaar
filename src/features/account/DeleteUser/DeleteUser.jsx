import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import ButtonWithProgress from '../../../components/ButtonWithProgress'
import { getCurrentUser, getIsAsyncRequest } from '../../../store/selectors'
import { DELETE_USER_REQUEST } from '../../../store/actions'
import AppInput from '../../../components/AppInput'

const DeleteUserPage = () => (
  <div>
    <h3>Delete User</h3>
    <DeleteUserForm />
  </div>
)

const useStyles = makeStyles({
  errorBar: {
    color: 'red'
  }
})

const DeleteUserFormBase = props => {
  const { isFetchingLoginData, deleteUser, currentUser } = props

  const [email, setEmail] = useState('')
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { email: '' }
  })

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isFetchingLoginData)
  }, [isFetchingLoginData])

  const onSubmit = () => {
    if (email === currentUser.email) {
      deleteUser({ setError })
    } else {
      setError({ message: 'Confirm your decision with valid email' })
    }
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {AppInput(emailInputProps)}
      <ButtonWithProgress
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        isLoading={isLoading}
        text="Delete user"
      />
      <div className={classes.errorBar}>{error && <p>{error.message}</p>}</div>
    </form>
  )
}

function mapStateToProps(state) {
  const { isFetchingLoginData } = getIsAsyncRequest(state)
  const currentUser = getCurrentUser(state)
  return { isFetchingLoginData, currentUser }
}

function mapDispatchToState(dispatch) {
  return {
    deleteUser: callbacks =>
      dispatch(DELETE_USER_REQUEST({ payload: { callbacks } }))
  }
}

const DeleteUserForm = connect(
  mapStateToProps,
  mapDispatchToState
)(DeleteUserFormBase)

export default DeleteUserPage
