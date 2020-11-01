import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '48%',
    height: '200px',
    padding: '2rem',
    boxSizing: 'border-box',
    margin: theme.spacing(1)
  },
  headLine: {
    fontSize: '30px',
    fontWeight: '600'
  }
}))

export default function Item(prop) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { name, description, price } = prop.item

  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.headLine}>{name}</div>
      <div>{description}</div>
    </Paper>
  )
}
