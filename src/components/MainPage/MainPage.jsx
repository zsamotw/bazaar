import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ItemList from '../ItemsList'

import SearchBar from '../SearchBar'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: '2rem',
    padding: '0 15rem',
    [theme.breakpoints.down('lg')]: {
      padding: '0 10rem'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 3rem'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 1rem'
    }
  }
}))

export default function MainPage() {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div className={classes.container}>
      <SearchBar />
      <ItemList />
    </div>
  )
}
