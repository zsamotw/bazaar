import React from 'react'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { getRecipientTransactions } from '../../store/selectors'
import { formattedDateTime } from '../../helpers/dateHelper'

const useStyles = makeStyles(theme => ({
  transaction: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(3)
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  itemImage: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: '25px',
    marginRight: theme.spacing(5)
  },
  divider: {
    margin: '1rem 0'
  },
  detailsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  donorData: {
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
        <Paper className={classes.transaction} key={transaction.id}>
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
          <div className={classes.detailsWrapper}>
            <div className={classes.donorData}>
              <div style={{ textTransform: 'uppercase' }}>From:</div>
              <div>{transaction.donor.displayName}</div>
              <div>{transaction.donor.email}</div>
            </div>
            <div>{formattedDateTime(new Date(transaction.takeAt))}</div>
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

function mapDispatchToState() {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToState
)(RecipientTransactions)
