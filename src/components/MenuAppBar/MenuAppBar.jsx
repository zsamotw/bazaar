import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// import AccountCircle from '@material-ui/icons/AccountCircle'
import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { SET_AUTH_USER } from '../../store/actions'
import { FirebaseContext } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { setAuthUserInLocalStorage } from '../LocalStorage'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const AccountCircle = props => {
  const { content } = props
  return <div style={{ textTransform: 'uppercase' }}>{content}</div>
}

function MenuAppBar(props) {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const firebase = useContext(FirebaseContext)
  const history = useHistory()

  const { currentUser } = props

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    firebase
      .doSignOut()
      .then(() => {
        props.setAuthUser(null)
        setAuthUserInLocalStorage(null)
        history.push(ROUTES.WELCOME)
      })
      .catch(() => {})
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            App App
          </Typography>
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircle content={currentUser.displayName.charAt(0)} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapDispatchToState = dispatch => {
  return {
    setAuthUser: authUser => dispatch(SET_AUTH_USER({ payload: authUser }))
  }
}

export default connect(null, mapDispatchToState)(MenuAppBar)
