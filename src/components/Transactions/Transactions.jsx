import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { GET_TRANSACTIONS_REQUEST } from '../../store/actions'
import { getIsFetchingData } from '../../store/selectors'
import RecipientTransactions from './RecipientTransactions'
import DonorTransactions from './DonorTransactions'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function Transactions(props) {
  const { getTransactions, isFetchingTransactions } = props

  const theme = useTheme()
  const classes = useStyles(theme)

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
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
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Things I was given" {...a11yProps(0)} />
        <Tab label="Things I gave" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} style={{ margin: '0 1rem' }}>
        <RecipientTransactions />
      </TabPanel>
      <TabPanel value={value} index={1} style={{ margin: '0 1rem' }}>
        <DonorTransactions />
      </TabPanel>
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
