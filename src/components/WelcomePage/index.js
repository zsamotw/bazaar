import React from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import SignInPage from '../SignInPage'
import SignUpPage from '../SignUpPage'

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
      {value === index && <>{children}</>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const WelcomePage = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <h1>App Welcome Page</h1>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Sign In" {...a11yProps(0)} />
        <Tab label="Sign Up" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SignInPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUpPage />
      </TabPanel>
    </>
  )
}

export default WelcomePage
