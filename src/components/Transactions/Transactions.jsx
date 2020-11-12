import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { GET_TRANSACTIONS_REQUEST } from '../../store/actions'
import { getIsAsyncRequest } from '../../store/selectors'
import RecipientTransactions from './RecipientTransactions'
import DonorTransactions from './DonorTransactions'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  tabPanel: {
    margin: '0 1rem'
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

function Transactions(props) {
  const { getTransactions, isFetchingTransactions } = props

  const theme = useTheme()
  const classes = useStyles(theme)

  const [tabValue, setTabValue] = React.useState(0)

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <>
      <Backdrop className={classes.backdrop} open={isFetchingTransactions}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Tabs
        value={tabValue}
        onChange={handleChangeTab}
        aria-label="simple tabs example"
      >
        <Tab label="Gifts" />
        <Tab label="Given away" />
      </Tabs>
      <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
        <DonorTransactions />
      </TabPanel>
      <TabPanel value={tabValue} index={1} className={classes.tabPanel}>
        <RecipientTransactions />
      </TabPanel>
    </>
  )
}

function mapStateToProps(state) {
  const { isFetchingTransactions } = getIsAsyncRequest(state)
  return { isFetchingTransactions }
}

function mapDispatchToState(dispatch) {
  return {
    getTransactions: () => dispatch(GET_TRANSACTIONS_REQUEST())
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Transactions)
