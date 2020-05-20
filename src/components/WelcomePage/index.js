import React from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Grid from '@material-ui/core/Grid'
import SignInPage from '../SignInPage'
import SignUpPage from '../SignUpPage'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`welcome-page-tabpanel-${index}`}
      aria-labelledby={`welcome-page-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `welcome-page-tab-${index}`,
    'aria-controls': `welcome-page-tabpanel-${index}`,
  }
}

const WelcomePage = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <h1>App Welcome Page</h1>
        </Grid>
        <Grid item xs={2} md={4} lg={7} />
        <Grid item xs={8} md={4} lg={3}>
          <Tabs value={value} onChange={handleChange} aria-label="Welcome Page">
            <Tab label="Sign In" {...a11yProps(0)} />
            <Tab label="Sign Up" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <SignInPage />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SignUpPage />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  )
}

export default WelcomePage
