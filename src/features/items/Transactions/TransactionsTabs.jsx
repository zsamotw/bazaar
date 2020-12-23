import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { GET_TRANSACTIONS_REQUEST } from '../../../store/actions'
import Transactions from './Transactions'
import {
  getRecipientTransactions,
  getDonorTransactions,
  getIsAsyncRequest
} from '../../../store/selectors'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  tabsContainer: {
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: theme.palette.grey['200']
  },
  tabs: {
    backgroundColor: theme.palette.grey['200']
  },
  tabPanel: {
    backgroundColor: theme.palette.grey['200'],
    padding: '1rem 15rem',
    [theme.breakpoints.down('md')]: {
      padding: '1rem 3rem'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1rem 1rem'
    }
  }
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  )
}

function TransactionsTabs(props) {
  const {
    getTransactions,
    isFetchingTransactions,
    donorTransactions,
    recipientTransactions
  } = props

  const theme = useTheme()
  const classes = useStyles(theme)

  const [tabValue, setTabValue] = React.useState(0)

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
  }

  useEffect(getTransactions, [getTransactions])

  return (
    <div className={classes.tabsContainer}>
      <Backdrop className={classes.backdrop} open={isFetchingTransactions}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Tabs
        value={tabValue}
        onChange={handleChangeTab}
        className={classes.tabs}
      >
        <Tab label="Gifts" />
        <Tab label="Given away" />
      </Tabs>
      <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
        <Transactions transactions={recipientTransactions} isDonor={false} />
      </TabPanel>
      <TabPanel value={tabValue} index={1} className={classes.tabPanel}>
        <Transactions transactions={donorTransactions} isDonor />
      </TabPanel>
    </div>
  )
}

function mapStateToProps(state) {
  const { isFetchingTransactions } = getIsAsyncRequest(state)
  const recipientTransactions = getRecipientTransactions(state)
  const donorTransactions = getDonorTransactions(state)
  return { isFetchingTransactions, recipientTransactions, donorTransactions }
}

function mapDispatchToState(dispatch) {
  return {
    getTransactions: () => dispatch(GET_TRANSACTIONS_REQUEST())
  }
}

export default connect(mapStateToProps, mapDispatchToState)(TransactionsTabs)
