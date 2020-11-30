import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import ButtonWithProgress from '../../../components/ButtonWithProgress'
import { getCurrentUser, getIsAsyncRequest } from '../../../store/selectors'
import AppInput from '../../../components/AppInput'
import { UPDATE_USER_ACCOUNT_DETAILS_REQUEST } from '../../../store/actions'

const useStyles = makeStyles({
  errorBar: {
    color: 'red'
  }
})

function AccountDetailsChange(props) {
  const {
    currentUser,
    isFetchingUpdateUserAccountData,
    updateUserProfile
  } = props

  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, errors, setValue } = useForm()

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isFetchingUpdateUserAccountData)
  }, [isFetchingUpdateUserAccountData])

  const onSubmit = data => {
    const { displayName } = data
    updateUserProfile(displayName, { setError })
  }

  const displayNameInputProps = {
    id: 'displayName-input',
    label: 'Display Name',
    variant: 'outlined',
    name: 'displayName',
    type: 'text',
    placeholder: 'Type your email...',
    register: register({
      required: 'Required'
    }),
    error: errors.displayName
  }

  useEffect(() => {
    setValue('displayName', currentUser.displayName)
  }, [currentUser, setValue])

  return (
    <>
      <h3>Account details:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>{AppInput(displayNameInputProps)}</div>
        <ButtonWithProgress
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          text="Save"
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
  const currentUser = getCurrentUser(state)
  const { isFetchingUpdateUserAccountData } = getIsAsyncRequest(state)
  return { currentUser, isFetchingUpdateUserAccountData }
}

function mapDispatchToState(dispatch) {
  return {
    updateUserProfile: (displayName, callbacks) =>
      dispatch(
        UPDATE_USER_ACCOUNT_DETAILS_REQUEST({
          payload: { displayName, callbacks }
        })
      )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToState
)(AccountDetailsChange)
