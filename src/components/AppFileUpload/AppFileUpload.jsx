import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'

const useStyles = makeStyles({
  control: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '5px',
    width: '48px'
  },
  input: {
    display: 'none'
  }
})
export default function AppFileUpload({
  id,
  name,
  onChange,
  accept,
  multiple,
  register,
  error
}) {
  const classes = useStyles()
  const [fileList, setFileList] = useState([])

  const handleChange = event => {
    const { files } = event.target
    setFileList(Object.values(files))
    onChange(event.target.files)
  }

  return (
    <FormControl>
      <div
        className={classes.control}
        style={error && { borderColor: '#f44336' }}
      >
        <label htmlFor={id}>
          <IconButton color="primary" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
        <input
          className={classes.input}
          id={id}
          name={name}
          ref={register}
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          type="file"
        />
      </div>
      <div>
        {fileList &&
          fileList.map(file => <div key={file.size}>{file.name}</div>)}
      </div>
    </FormControl>
  )
}
