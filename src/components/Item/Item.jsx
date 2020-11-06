import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const paperTextStyles = {
  color: 'white',
  padding: '.5rem',
  borderRadius: '10px',
  opacity: 0.5
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '400px',
    boxSizing: 'border-box',
    margin: theme.spacing(1),
    padding: '1rem',
    background: "url('https://source.unsplash.com/600x400/?thing')",
    backgroundSize: 'cover',
    '&:hover': {
      '& div': {
        opacity: 1
      }
    }
  },
  texts: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  headLine: {
    ...paperTextStyles,
    backgroundColor: theme.palette.secondary.dark,
    fontSize: '30px',
    fontWeight: '600',
    marginBottom: '2rem'
  },
  description: {
    ...paperTextStyles,
    backgroundColor: theme.palette.primary.dark
  },
  shoppingCardIcon: {
    '&:hover': {
      '& svg': {
        color: theme.palette.primary.main,
        cursor: 'pointer'
      }
    }
  }
}))

export default function Item(prop) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { name, description, seller } = prop.item

  return (
    <Grid item xs={12} md={4}>
      <Paper className={classes.root} elevation={3}>
        <div className={classes.texts}>
          <div className={classes.headLine}>
            <div>{name}</div>
            <div style={{ fontSize: '1rem' }}>by {seller.displayName}</div>
          </div>
          <IconButton className={classes.shoppingCardIcon}>
            <ShoppingCartIcon color="secondary" fontSize="large" />
          </IconButton>
        </div>
        <div className={classes.description}>{description}</div>
      </Paper>
    </Grid>
  )
}
