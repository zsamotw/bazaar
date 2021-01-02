import React from 'react'
import { useTranslation } from 'react-i18next'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { formattedDateTime } from '../../../services/date-service'

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
  recipientData: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

export default function Transactions(props) {
  const { transactions, isDonor } = props

  const theme = useTheme()
  const classes = useStyles(theme)
  const { t } = useTranslation('common')

  return (
    <>
      {transactions.map(transaction => (
        <Paper className={classes.transaction} key={transaction.id}>
          <div className={classes.itemHeader}>
            <img
              src={transaction.imgURL}
              alt="item"
              className={classes.itemImage}
            />
            <h3>{transaction.name}</h3>
          </div>
          <div>{transaction.description}</div>
          <div style={{ fontWeight: 'bold' }}>{transaction.category.label}</div>
          <Divider className={classes.divider} />
          <div className={classes.detailsWrapper}>
            <div className={classes.recipientData}>
              <div style={{ textTransform: 'uppercase' }}>
                {isDonor ? t('transactions.to') : t('transactions.from')}
              </div>
              <div>
                {isDonor
                  ? transaction.recipient.displayName
                  : transaction.donor.displayName}
              </div>
              <div>
                {isDonor
                  ? transaction.recipient.email
                  : transaction.donor.email}
              </div>
            </div>
            <div>{formattedDateTime(new Date(transaction.takeAt))}</div>
          </div>
        </Paper>
      ))}
    </>
  )
}
