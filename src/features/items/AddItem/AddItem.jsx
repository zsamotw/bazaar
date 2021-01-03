import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import ButtonWithProgress from '../../../components/ButtonWithProgress'
import AppInput from '../../../components/AppInput'
import AppSelect from '../../../components/AppSelect'
import { ADD_ITEM_REQUEST } from '../../../store/actions'
import { getIsAsyncRequest } from '../../../store/selectors'
import categories_ from '../../../constants/categories'
import AppFileUpload from '../../../components/AppFileUpload'

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
    margin: '1rem 1rem 2rem 0'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const AddItemForm = props => {
  const { addItem, isProcessingItem } = props

  const classes = useStyles()

  const { t } = useTranslation('common')

  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState({})

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: { name: '', description: '', category: '', FileUpload: null }
  })

  const history = useHistory()

  const categories = categories_.map(c => {
    return { ...c, label: t(`data.categories.${c.slug}`) }
  })

  useEffect(() => {
    setIsLoading(isProcessingItem)
  }, [isProcessingItem])

  const nameInputProps = {
    id: 'itemName-input',
    label: t('addItem.inputs.name.label'),
    variant: 'outlined',
    name: 'name',
    type: 'text',
    fullWidth: true,
    placeholder: t('addItem.inputs.name.placeholder'),
    register: register({
      required: t('addItem.inputs.name.error.required')
    }),
    error: errors.name
  }

  const descriptionInputProps = {
    id: 'itemDescription-input',
    label: t('addItem.inputs.description.label'),
    variant: 'outlined',
    name: 'description',
    type: 'text',
    fullWidth: true,
    isMultiline: true,
    placeholder: t('addItem.inputs.description.placeholder'),
    register: register({
      required: t('addItem.inputs.description.label')
    }),
    error: errors.description
  }

  const handleUploadFile = files => {
    setFile(files[0])
  }
  const onSubmit = ({ name, description, categoryId }) => {
    const category = categories.find(c => c.id === categoryId)
    addItem(name, description, category, file, history, { setError })
  }

  return (
    <Grid container>
      <Grid item className={classes.wrapper} xs={10} md={8} lg={4}>
        <h3>{t('addItem.title')}</h3>
        <h5>{t('addItem.description')}</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          {AppInput(nameInputProps)}
          {AppInput(descriptionInputProps)}
          <div style={{ width: '33%', marginBottom: '2rem' }}>
            <AppSelect
              id="categoryId"
              labelId="category-select-label"
              name="categoryId"
              menuItems={categories}
              control={control}
              inputLabel={t('addItem.inputs.category.label')}
              rules={{ required: t('addItem.inputs.category.error.required') }}
              error={errors.categoryId}
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <AppFileUpload
              id="image-upload-control"
              name="imageUpload"
              onChange={handleUploadFile}
              accept="image/*"
              multiple={false}
              register={register({
                required: t('addItem.inputs.fileUpload.error.required')
              })}
              error={errors.imageUpload}
            />
          </div>
          <ButtonWithProgress
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            text={t('addItem.button')}
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
    addItem: (name, description, category, file, history, callbacks) =>
      dispatch(
        ADD_ITEM_REQUEST({
          payload: { name, description, category, file, history, callbacks }
        })
      )
  }
}

export default connect(mapStateToProps, mapDispatchToState)(AddItemForm)
