import React from 'react'
import { useTranslation } from 'react-i18next'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import SearchBar from '../SearchBar'
import * as ROUTES from '../../../constants/routes'
import { SET_AUTH_USER } from '../../../store/actions/sync-actions'
import { LOGOUT_REQUEST } from '../../../store/actions/async-actions'
import { getSearchBarConfig } from '../../../store/selectors'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  title: {
    marginRight: theme.spacing(3)
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    textTransform: 'uppercase',
    backgroundColor: theme.palette.secondary.main
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1.5em',
    marginLeft: '1.5rem'
  }
}))

function MenuAppBar(props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const history = useHistory()
  const { path } = useRouteMatch()

  const { t } = useTranslation('common')

  const { currentUser, logout, isSearchBarVisible } = props

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleNavigateAccount = () => {
    history.push(`${path}${ROUTES.ACCOUNT}`)
    setAnchorEl(null)
  }

  const handleNavigateCreateItem = () => {
    history.push(`${path}${ROUTES.ITEMS}${ROUTES.CREATE_ITEM}`)
    setAnchorEl(null)
  }

  const handleNavigateTransaction = () => {
    history.push(`${path}${ROUTES.ITEMS}${ROUTES.TRANSACTIONS}`)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    const messageOnError = t('menuAppBar.messageOnLogOutError')
    logout({ messageOnError })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={ROUTES.HOME}
              style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '20px',
                textTransform: 'uppercase'
              }}
            >
              Bazaar
            </Link>
          </Typography>
          <SearchBar isVisible={isSearchBarVisible} />
          <div className={classes.grow} />
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar className={classes.avatar}>
                {currentUser.displayName
                  ? currentUser.displayName.charAt(0)
                  : ''}
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
              <MenuItem onClick={handleNavigateCreateItem}>
                {t('menuAppBar.menu.createNewItem')}
              </MenuItem>
              <MenuItem onClick={handleNavigateTransaction}>
                {t('menuAppBar.menu.transactions')}
              </MenuItem>
              <MenuItem onClick={handleNavigateAccount}>
                {t('menuAppBar.menu.profile')}
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                {t('menuAppBar.menu.logout')}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = state => {
  const { isVisible: isSearchBarVisible } = getSearchBarConfig(state)
  return { isSearchBarVisible }
}

const mapDispatchToState = dispatch => {
  return {
    setAuthUser: authUser => dispatch(SET_AUTH_USER(authUser)),
    logout: logOutData => dispatch(LOGOUT_REQUEST(logOutData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(MenuAppBar)
