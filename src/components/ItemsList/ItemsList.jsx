import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { GET_ITEMS_REQUEST } from '../../store/actions'
import { getIsFetchingData, getItems } from '../../store/selectors'
import Item from '../Item'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
}))

function ItemsList(props) {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { getItemsList, items, isFetchingProcessItem } = props

  useEffect(() => {
    getItemsList()
  }, [])

  return (
    <div className={classes.root}>
      {items ? items.map(item => <Item item={item} />) : null}
    </div>
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
