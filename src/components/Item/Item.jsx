import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const paperTextStyles = {
  color: 'white',
  padding: '.5rem',
  borderRadius: '10px',
  opacity: 0.5
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '400px',
    padding: '2rem',
    boxSizing: 'border-box',
    margin: theme.spacing(1),
    background: "url('https://source.unsplash.com/600x400/?thing')",
    backgroundSize: 'cover',
    '&:hover': {
      '& span': {
        opacity: 1
      }
    }
  },
  headLine: {
    ...paperTextStyles,
    backgroundColor: theme.palette.secondary.dark,
    fontSize: '30px',
    fontWeight: '600'
  },
  description: {
    ...paperTextStyles,
    backgroundColor: theme.palette.primary.dark
  }
}))

export default function Item(prop) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { name, description } = prop.item

  return (
    <Grid item xs={4}>
      <Paper className={classes.root} elevation={3}>
        <div style={{ marginBottom: '2rem' }}>
          <span className={classes.headLine}>{name}</span>
        </div>
        <div>
          <span className={classes.description}>{description}</span>
        </div>
      </Paper>
    </Grid>
  )
}
