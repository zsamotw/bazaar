import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import ButtonWithProgress from '../ButtonWithProgress'
import { getCurrentUser, getIsFetchingData } from '../../store/selectors'
import AppInput from '../AppInput'
import { setAuthUserInLocalStorage } from '../LocalStorage'
import { withFirebase } from '../Firebase'
import { UPDATE_USER_ACCOUNT_DETAILS_REQUEST } from '../../store/actions'

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

  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, errors } = useForm()

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isFetchingUpdateUserAccountData)
  }, [isFetchingUpdateUserAccountData])

  const onSubmit = () => {
    updateUserProfile(displayName, { setAuthUserInLocalStorage, setError })
  }

  const displayNameInputProps = {
    id: 'displayName-input',
    label: 'Display Name',
    variant: 'outlined',
    name: 'displayName',
    value: displayName,
    onChange: event => setDisplayName(event.target.value),
    type: 'text',
    placeholder: 'Type your email...',
    register: register({
      required: 'Required'
    }),
    error: errors.displayName
  }

  useEffect(() => {
    setDisplayName(currentUser.displayName)
  }, [currentUser])

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
  const { isFetchingUpdateUserAccountData } = getIsFetchingData(state)
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

export default withFirebase(
  connect(mapStateToProps, mapDispatchToState)(AccountDetailsChange)
)
