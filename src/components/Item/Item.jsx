import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    height: '300px',
    padding: '2rem',
    boxSizing: 'border-box',
    margin: theme.spacing(1),
    background: "url('https://source.unsplash.com/600x400/?thing')",
    backgroundSize: 'cover',
    '&:hover': {
      '& div': {
        opacity: 1
      }
    }
  },
  headLine: {
    backgroundColor: theme.palette.secondary.dark,
    color: 'white',
    fontSize: '30px',
    fontWeight: '600',
    padding: '.5rem',
    marginBottom: '2rem',
    borderRadius: '10px',
    opacity: 0.5
  },
  description: {
    color: 'white',
    backgroundColor: theme.palette.primary.dark,
    padding: '.5rem',
    borderRadius: '10px',
    opacity: 0.5
  }
}))

export default function Item(prop) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { name, description, price } = prop.item

  return (
    <Grid item xs={6}>
      <Paper className={classes.root} elevation={3}>
        <div className={classes.headLine}>{name}</div>
        <div className={classes.description}>{description}</div>
      </Paper>
    </Grid>
  )
}
