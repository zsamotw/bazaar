import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ButtonWithProgress from '../ButtonWithProgress'
import AppInput from '../AppInput'
import AppSelect from '../AppSelect'
import { ADD_ITEM_REQUEST } from '../../store/actions'
import { getIsAsyncRequest } from '../../store/selectors'
import categories from '../../constants/categories'
import FileUpload from '../FileUpload'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto'
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
  const [file, setFile] = useState({})

  const { register, handleSubmit, errors, control } = useForm()

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isProcessingItem)
  }, [isProcessingItem])

  const nameInputProps = {
    id: 'itemName-input',
    label: 'Name',
    variant: 'outlined',
    name: 'name',
    type: 'text',
    fullWidth: true,
    placeholder: 'Type item name...',
    register: register({
      required: 'Required'
    }),
    error: errors.name
  }
  const descriptionInputProps = {
    id: 'itemDescription-input',
    label: 'Description',
    variant: 'outlined',
    name: 'description',
    type: 'text',
    fullWidth: true,
    isMultiline: true,
    placeholder: 'Type item description...',
    register: register({
      required: 'Required'
    }),
    error: errors.description
  }

  const handleUploadFile = files => {
    setFile(files[0])
  }
  const onSubmit = ({ name, description, categoryId }) => {
    const category = categories.find(c => c.id === categoryId)
    addItem(name, description, category, file, { setError })
  }

  return (
    <Grid container>
      <Grid item className={classes.wrapper} xs={12} lg={6}>
        <h3>Add item</h3>
        <h5>Describe what you want to share</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>{AppInput(nameInputProps)}</div>
          <div>{AppInput(descriptionInputProps)}</div>
          <div>
            <AppSelect
              name="categoryId"
              menuItems={categories}
              control={control}
              inputLabel="category"
              error={errors.categoryId}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <FileUpload
              id="image-upload-control"
              name="imageUpload"
              onChange={handleUploadFile}
              accept="image/*"
              multiple={false}
              register={register({
                required: true
              })}
              error={errors.imageUpload}
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
      </Grid>
    </Grid>
  )
}

function mapStateToProps(state) {
  const { isProcessingItem } = getIsAsyncRequest(state)
  return { isProcessingItem }
}

function mapDispatchToState(dispatch) {
  return {
    addItem: (name, description, category, file, callbacks) =>
      dispatch(
        ADD_ITEM_REQUEST({
          payload: { name, description, category, file, callbacks }
        })
      )
  }
}

export default connect(mapStateToProps, mapDispatchToState)(AddItemForm)
