import React from 'react'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { getRecipientTransactions } from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  transaction: {
    padding: '1rem',
    marginTop: '2rem'
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  itemImage: {
    width: '3rem',
    height: '3rem',
    borderRadius: '25px',
    marginRight: '3rem'
  },
  divider: {
    margin: '1rem 0'
  },
  recipientData: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

function RecipientTransactions(props) {
  const { transactions } = props

  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <>
      {transactions.map(transaction => (
        <Paper className={classes.transaction}>
          <div className={classes.itemHeader}>
            <img
              src="https://source.unsplash.com/600x400/?thing"
              alt="item"
              className={classes.itemImage}
            />
            <h3>{transaction.name}</h3>
          </div>
          <div>{transaction.description}</div>
          <Divider className={classes.divider} />
          <div className={classes.recipientData}>
            <div style={{ textTransform: 'uppercase' }}>From:</div>
            <div>{transaction.donor.displayName}</div>
            <div>{transaction.donor.email}</div>
          </div>
        </Paper>
      ))}
    </>
  )
}

function mapStateToProps(state) {
  const transactions = getRecipientTransactions(state)
  return { transactions }
}

function mapDispatchToState(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToState
)(RecipientTransactions)
