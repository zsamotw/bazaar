import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    marginBottom: '10px',
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
})

export default function AppInput(props) {
  const classes = useStyles()
  const { id, label, variant, name, value, onChange, type, placeholder } = props
  return (
    <TextField
      id={id}
      className={classes.root}
      label={label}
      variant={variant}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  )
}
