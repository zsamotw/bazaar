import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { GET_ITEMS_REQUEST } from '../../store/actions'
import { getIsFetchingData, getItems } from '../../store/selectors'
import Item from '../Item'

function ItemsList(props) {
  const { getItemsList, items, isFetchingProcessItem } = props

  useEffect(() => {
    getItemsList()
  }, [])

  return (
    <Grid container>
      {items ? items.map(item => <Item item={item} />) : null}
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
