import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import ButtonWithProgress from '../ButtonWithProgress'
import AppInput from '../AppInput'
import { ADD_ITEM_REQUEST } from '../../store/actions'
import { getIsFetchingData } from '../../store/selectors'

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
  const { addItem, isFetchingProcessItem } = props

  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, errors } = useForm()

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isFetchingProcessItem)
  }, [isFetchingProcessItem])

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
  const itemPriceInputProps = {
    id: 'itemPrice-input',
    label: 'Item price',
    variant: 'outlined',
    name: 'item price',
    value: itemPrice,
    onChange: event => setItemPrice(event.target.value),
    type: 'number',
    placeholder: 'Type item price...',
    register: register({
      required: 'Required'
    }),
    error: errors.passwordTwo
  }

  const onSubmit = () => {
    addItem(itemName, itemDescription, itemPrice, { setError })
  }

  return (
    <>
      <div className={classes.wrapper}>
        <h3>Add item</h3>
        <h5>Describe what you want to share</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>{AppInput(itemNameInputProps)}</div>
          <div>{AppInput(itemDescriptionInputProps)}</div>
          <div>{AppInput(itemPriceInputProps)}</div>
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
  const { isFetchingProcessItem } = getIsFetchingData(state)
  return { isFetchingProcessItem }
}

function mapDispatchToState(dispatch) {
  return {
    addItem: (name, description, price, callbacks) =>
      dispatch(
        ADD_ITEM_REQUEST({
          payload: { name, description, price, callbacks }
        })
      )
  }
}

export default connect(mapStateToProps, mapDispatchToState)(PasswordChangeForm)
