import React from 'react'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { getDonorTransactions } from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  transaction: {
    display: 'flex'
  },
  itemData: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column'
  },
  donorData: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column'
  }
}))

function DonorTransactions(props) {
  const { transactions } = props

  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <>
      <h1>Things I gave:</h1>
      <div className={classes.transaction}>
        {transactions.map(transaction => (
          <>
            <div className={classes.itemData}>
              <h3>{transaction.name}</h3>
              <div>{transaction.description}</div>
            </div>
            <div className={classes.donorData}>
              <h3>{transaction.donor.displayName}</h3>
              <div>{transaction.donor.email}</div>
            </div>
          </>
        ))}
      </div>
    </>
  )
}

function mapStateToProps(state) {
  const transactions = getDonorTransactions(state)
  return { transactions }
}

function mapDispatchToState(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToState)(DonorTransactions)
