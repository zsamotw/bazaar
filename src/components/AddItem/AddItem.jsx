import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import ButtonWithProgress from '../ButtonWithProgress'
import AppInput from '../AppInput'
import { ADD_ITEM_REQUEST } from '../../store/actions'
import { getIsAsyncRequest } from '../../store/selectors'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  errorBar: {
    color: 'red'
  }
})

const PasswordChangeForm = props => {
  const { addItem, isProcessingItem } = props

  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, errors } = useForm()

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isProcessingItem)
  }, [isProcessingItem])

  const itemNameInputProps = {
    id: 'itemName-input',
    label: 'Name',
    variant: 'outlined',
    name: 'name',
    value: itemName,
    onChange: event => setItemName(event.target.value),
    type: 'text',
    placeholder: 'Type item name...',
    register: register({
      required: 'Required'
    }),
    error: errors.itemName
  }
  const itemDescriptionInputProps = {
    id: 'itemDescription-input',
    label: 'Description',
    variant: 'outlined',
    name: 'description',
    value: itemDescription,
    onChange: event => setItemDescription(event.target.value),
    type: 'text',
    isMultiline: true,
    placeholder: 'Type item description...',
    register: register({
      required: 'Required'
    }),
    error: errors.passwordOne
  }

  const onSubmit = () => {
    addItem(itemName, itemDescription, { setError })
  }

  return (
    <>
      <div className={classes.wrapper}>
        <h3>Add item</h3>
        <h5>Describe what you want to share</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>{AppInput(itemNameInputProps)}</div>
          <div>{AppInput(itemDescriptionInputProps)}</div>
          <ButtonWithProgress
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            text="Add"
            isLoading={isLoading}
          />

          <div className={classes.errorBar}>
            {error && <p>{error.message}</p>}
          </div>
        </form>
      </div>
    </>
  )
}

function mapStateToProps(state) {
  const { isProcessingItem } = getIsAsyncRequest(state)
  return { isProcessingItem }
}

function mapDispatchToState(dispatch) {
  return {
    addItem: (name, description, callbacks) =>
      dispatch(
        ADD_ITEM_REQUEST({
          payload: { name, description, callbacks }
        })
      )
  }
}

export default connect(mapStateToProps, mapDispatchToState)(PasswordChangeForm)
