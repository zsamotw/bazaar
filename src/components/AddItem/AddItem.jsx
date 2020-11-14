import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import ButtonWithProgress from '../ButtonWithProgress'
import AppInput from '../AppInput'
import AppSelect from '../AppSelect'
import { ADD_ITEM_REQUEST } from '../../store/actions'
import { getIsAsyncRequest } from '../../store/selectors'
import categories from '../../constants/categories'

const useStyles = makeStyles(theme => ({
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
  },
  formControl: {
    minWidth: 120,
    margin: '8px 8px 20px 0'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const AddItemForm = props => {
  const { addItem, isProcessingItem } = props

  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, errors, control } = useForm()

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isProcessingItem)
  }, [isProcessingItem])

  const itemNameInputProps = {
    id: 'itemName-input',
    label: 'Name',
    variant: 'outlined',
    name: 'name',
    type: 'text',
    placeholder: 'Type item name...',
    register: register({
      required: 'Required'
    }),
    error: errors.name
  }
  const itemDescriptionInputProps = {
    id: 'itemDescription-input',
    label: 'Description',
    variant: 'outlined',
    name: 'description',
    type: 'text',
    isMultiline: true,
    placeholder: 'Type item description...',
    register: register({
      required: 'Required'
    }),
    error: errors.description
  }

  const onSubmit = ({ name, description, category }) => {
    addItem(name, description, category, { setError })
  }

  return (
    <>
      <div className={classes.wrapper}>
        <h3>Add item</h3>
        <h5>Describe what you want to share</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>{AppInput(itemNameInputProps)}</div>
          <div>{AppInput(itemDescriptionInputProps)}</div>
          <div>
            <AppSelect
              name="category"
              menuItems={categories}
              control={control}
              label="category"
              error={errors.category}
            />
          </div>
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
    addItem: (name, description, category, callbacks) =>
      dispatch(
        ADD_ITEM_REQUEST({
          payload: { name, description, category, callbacks }
        })
      )
  }
}

export default connect(mapStateToProps, mapDispatchToState)(AddItemForm)
