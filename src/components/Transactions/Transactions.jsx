import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { GET_TRANSACTIONS_REQUEST } from '../../store/actions'
import { getIsFetchingData } from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

function Transactions(props) {
  const { getTransactions, isFetchingTransactions } = props

  const theme = useTheme()
  const classes = useStyles(theme)
  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <>
      <Backdrop className={classes.backdrop} open={isFetchingTransactions}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <div>Transactons:</div>
    </>
  )
}

function mapStateToProps(state) {
  const { isFetchingTransactions } = getIsFetchingData(state)
  return { isFetchingTransactions }
}

function mapDispatchToState(dispatch) {
  return {
    getTransactions: () => dispatch(GET_TRANSACTIONS_REQUEST())
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Transactions)
