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
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

const LandingPage = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <h1 style={{ paddingLeft: '20px' }}>App App</h1>
        </Grid>
        <Grid item xs={2} md={4} lg={7} />
        <Grid item xs={8} md={4} lg={3}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
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

export default LandingPage
