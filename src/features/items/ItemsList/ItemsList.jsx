import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { GET_ITEMS_REQUEST } from '../../../store/actions'
import { getIsAsyncRequest, getItems } from '../../../store/selectors'
import Item from '../Item'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  gridContainer: {
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

function ItemsList(props) {
  const { getItemsList, items, isProcessingItem } = props
  const theme = useTheme()
  const classes = useStyles(theme)

  useEffect(() => {
    getItemsList()
  }, [getItemsList])

  return (
    <Grid container>
      <Backdrop className={classes.backdrop} open={isProcessingItem}>
        <CircularProgress color="secondary" />
      </Backdrop>
      {items ? items.map(item => <Item item={item} key={item.id} />) : null}
    </Grid>
  )
}

function mapStateToProps(state) {
  const { isProcessingItem } = getIsAsyncRequest(state)
  const items = getItems(state)
  return { isProcessingItem, items }
}

function mapDispatchToState(dispatch) {
  return {
    getItemsList: () => dispatch(GET_ITEMS_REQUEST())
  }
}

export default connect(mapStateToProps, mapDispatchToState)(ItemsList)
