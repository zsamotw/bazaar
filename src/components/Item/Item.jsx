import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { connect } from 'react-redux'
import Dialogs from './Dialogs'
import { getCurrentUser, getIsFetchingData } from '../../store/selectors'
import { REMOVE_ITEM_REQUEST, SET_RECIPIENT_REQUEST } from '../../store/actions'

const paperTextStyles = {
  color: 'white',
  padding: '.5rem',
  borderRadius: '10px',
  opacity: 0.5
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '400px',
    boxSizing: 'border-box',
    margin: theme.spacing(1),
    padding: '1rem',
    background: "url('https://source.unsplash.com/600x400/?thing')",
    backgroundSize: 'cover',
    '&:hover': {
      '& div,h1,h2,h3,h4,h5': {
        opacity: 1
      }
    }
  },
  texts: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  headLine: {
    ...paperTextStyles,
    backgroundColor: theme.palette.secondary.dark,
    fontWeight: '600',
    marginBottom: '2rem',
    marginTop: '0'
  },
  description: {
    ...paperTextStyles,
    opacity: 0,
    backgroundColor: theme.palette.primary.dark
  },
  recipient: {
    ...paperTextStyles,
    marginLeft: '1rem',
    backgroundColor: theme.palette.error.dark
  },
  deleteIcon: {
    '& svg': {
      color: theme.palette.error.main
    },
    '&:hover': {
      '& svg': {
        color: theme.palette.error.dark,
        cursor: 'pointer'
      }
    }
  },
  shoppingCardIcon: {
    '&:hover': {
      '& svg': {
        color: theme.palette.primary.main,
        cursor: 'pointer'
      }
    }
  }
}))

function Item(prop) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { item, removeItem, setRecipient, currentUser } = prop
  const { name, description, donor, recipient, id } = item

  const [openRemoveDialog, setOpenRemoveDialog] = React.useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false)

  const handleRemoveItem = () => {
    removeItem(item)
    setOpenRemoveDialog(false)
  }

  const handleSetRecipient = () => {
    setRecipient(item)
    setOpenConfirmDialog(false)
  }

  const handleClickOpenRemoveDialog = () => {
    setOpenRemoveDialog(true)
  }

  const handleCloseRemoveDialog = () => {
    setOpenRemoveDialog(false)
  }

  const handleClickOpenConfirmDialog = () => {
    setOpenConfirmDialog(true)
  }

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false)
  }

  const getIcon = () => {
    if (item.donor.uid === currentUser.uid && !item.recipient) {
      return (
        <IconButton
          className={classes.deleteIcon}
          onClick={handleClickOpenRemoveDialog}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      )
    }
    if (!item.recipient) {
      return (
        <IconButton
          className={classes.shoppingCardIcon}
          onClick={handleClickOpenConfirmDialog}
        >
          <ShoppingCartIcon color="secondary" fontSize="large" />
        </IconButton>
      )
    }
    return (
      <div className={classes.recipient}>
        Goes to happy {recipient.displayName}
      </div>
    )
  }

  return (
    <Grid item sm={12} md={6} lg={4}>
      <Dialogs
        openRemoveDialog={openRemoveDialog}
        handleCloseRemoveDialog={handleCloseRemoveDialog}
        openConfirmDialog={openConfirmDialog}
        handleCloseConfirmDialog={handleCloseConfirmDialog}
        handleRemoveItem={handleRemoveItem}
        handleSetRecipient={handleSetRecipient}
        item={item}
      />
      <Paper className={classes.root} elevation={3}>
        <div className={classes.texts}>
          <h1 className={classes.headLine}>
            <div>{name}</div>
            <div style={{ fontSize: '1rem' }}>
              by {donor ? donor.displayName : ''}
            </div>
          </h1>
          {getIcon(item, currentUser)}
        </div>
        <div className={classes.description}>{description}</div>
      </Paper>
    </Grid>
  )
}

function mapStateToProps(state) {
  const { isFetchingProcessItem } = getIsFetchingData(state)
  const currentUser = getCurrentUser(state)
  return { isFetchingProcessItem, currentUser }
}

function mapDispatchToState(dispatch) {
  return {
    removeItem: item => dispatch(REMOVE_ITEM_REQUEST({ payload: { item } })),
    setRecipient: item => dispatch(SET_RECIPIENT_REQUEST({ payload: { item } }))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Item)
