import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import { SET_AUTH_USER } from '../../store/actions'
import { FirebaseContext } from '../Firebase'
import { setAuthUserInLocalStorage } from '../LocalStorage'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    textTransform: 'uppercase',
    backgroundColor: theme.palette.secondary.main
  }
}))

function MenuAppBar(props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const firebase = useContext(FirebaseContext)
  const history = useHistory()

  const { currentUser } = props

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleNavigateAccount = () => {
    history.push(ROUTES.HOME_ACCOUNT)
    setAnchorEl(null)
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
            <Link
              to={ROUTES.HOME}
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              App App
            </Link>
          </Typography>
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar className={classes.avatar}>
                {currentUser.displayName.charAt(0)}
              </Avatar>
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
              <MenuItem onClick={handleNavigateAccount}>Profile</MenuItem>
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
