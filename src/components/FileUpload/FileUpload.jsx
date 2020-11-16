import React from 'react'
import { makeStyles } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'

const useStyles = makeStyles({
  input: {
    display: 'none'
  }
})
export default function FileUpload({ onChange }) {
  const classes = useStyles()

  return (
    <FormControl>
      <label htmlFor="icon-button-photo">
        <IconButton color="primary" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <input
        className={classes.input}
        id="icon-button-photo"
        name="icon-button-photo"
        accept="image/*"
        onChange={onChange}
        type="file"
      />
    </FormControl>
  )
}
