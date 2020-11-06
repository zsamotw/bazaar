import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { GET_ITEMS_REQUEST } from '../../store/actions'
import { getIsFetchingData, getItems } from '../../store/selectors'
import Item from '../Item'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

function ItemsList(props) {
  const { getItemsList, items, isFetchingProcessItem } = props
  const theme = useTheme()
  const classes = useStyles(theme)

  useEffect(() => {
    getItemsList()
  }, [])

  return (
    <Grid container style={{ marginTop: '2rem' }}>
      <Backdrop className={classes.backdrop} open={isFetchingProcessItem}>
        <CircularProgress color="secondary" />
      </Backdrop>
      {items ? items.map(item => <Item item={item} key={item.id} />) : null}
    </Grid>
  )
}

function mapStateToProps(state) {
  const { isFetchingProcessItem } = getIsFetchingData(state)
  const items = getItems(state)
  return { isFetchingProcessItem, items }
}

function mapDispatchToState(dispatch) {
  return {
    getItemsList: () => dispatch(GET_ITEMS_REQUEST())
  }
}

export default connect(mapStateToProps, mapDispatchToState)(ItemsList)
