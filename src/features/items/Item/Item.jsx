import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { connect } from 'react-redux'
import Dialogs from './Dialogs'
import { getCurrentUser, getIsAsyncRequest } from '../../../store/selectors'
import {
  REMOVE_ITEM_REQUEST,
  SET_RECIPIENT_REQUEST
} from '../../../store/actions/async-actions'

const paperTextStyles = {
  color: 'white',
  padding: '.5rem',
  borderRadius: '10px',
  opacity: 0.5
}

const useStyles = makeStyles(theme => ({
  gridItem: {
    marginBottom: '1rem',
    '&:hover': {
      '& $imageWrapper': {
        border: `5px solid ${theme.palette.primary.main}`,
        backgroundImage: 'linear-gradient(to left, #6fa8758a, #6fa8758a )'
      },
      '& img': {
        transform: 'scale(1.2)',
        zIndex: '-1'
      },
      '& $description': {
        opacity: '1'
      }
    }
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  headLine: {
    fontWeight: '600',
    marginBottom: '.1rem'
  },
  description: {
    ...paperTextStyles,
    padding: '1.5rem',
    margin: '1.5rem',
    position: 'absolute',
    opacity: 0,
    backgroundColor: 'black',
    overflowY: 'auto'
  },
  recipient: {
    ...paperTextStyles,
    marginLeft: '1rem',
    backgroundColor: theme.palette.error.dark
  },
  imageWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    boxSizing: 'border-box',
    margin: '1rem 1.6rem 1rem 0',
    overflow: 'hidden',
    border: `5px solid ${theme.palette.secondary.main}`,
    borderRadius: '15px'
  },
  image: {
    transition: 'all .3s',
    height: '100%'
  },
  donor: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 0 0'
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    textTransform: 'uppercase',
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(1)
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

  const { t } = useTranslation('common')

  const { item, removeItem, setRecipient, currentUser } = prop
  const { id, name, description, category, donor, recipient, createdAt } = item

  const [openRemoveDialog, setOpenRemoveDialog] = React.useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false)

  const handleRemoveItem = () => {
    const messageOnSuccess = t('item.messageOnRemoveSuccess')
    const messageOnError = t('createItem.messageOnRemoveError')
    const messageOnFileRemoveError = t('createItem.messageOnFileRemoveError')
    const messageOnUserAccessError = t(
      'createItem.messageOnUserItemAccessError'
    )
    removeItem({
      item,
      messageOnSuccess,
      messageOnError,
      messageOnFileRemoveError,
      messageOnUserAccessError
    })
    setOpenRemoveDialog(false)
  }

  const handleSetRecipient = () => {
    const messageOnSuccess = t('item.messageOnSetRecipientSuccess')
    const messageOnError = t('createItem.messageOnSetRecipientError')
    const messageOnUserSetRecipientAccessError = t(
      'createItem.messageOnUserSetRecipientAccessError'
    )
    setRecipient({
      item,
      messageOnSuccess,
      messageOnError,
      messageOnUserSetRecipientAccessError
    })
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

  const hasData = () =>
    !!item &&
    !!id &&
    !!name &&
    !!description &&
    !!category &&
    !!category.label &&
    !!donor &&
    !!donor.email &&
    !!donor.displayName &&
    !!createdAt

  const getIcon = () => {
    if (
      item &&
      item.donor &&
      item.donor.uid === currentUser.uid &&
      !item.recipient
    ) {
      return (
        <IconButton
          className={classes.deleteIcon}
          onClick={handleClickOpenRemoveDialog}
          data-testid="removeIcon"
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      )
    }
    if (item && !item.recipient) {
      return (
        <IconButton
          className={classes.shoppingCardIcon}
          onClick={handleClickOpenConfirmDialog}
          data-testid="confirmIcon"
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
    hasData() && (
      <Grid className={classes.gridItem} item xs={12} sm={6} lg={4} xl={3}>
        <Dialogs
          openRemoveDialog={openRemoveDialog}
          handleCloseRemoveDialog={handleCloseRemoveDialog}
          openConfirmDialog={openConfirmDialog}
          handleCloseConfirmDialog={handleCloseConfirmDialog}
          handleRemoveItem={handleRemoveItem}
          handleSetRecipient={handleSetRecipient}
          item={item}
        />
        <h3 className={classes.headLine}>{name || ''}</h3>
        <div style={{ marginBottom: '.07rem' }}>{category.label}</div>
        <div className={classes.imageWrapper}>
          <img src={item.imgURL} alt="i" className={classes.image} />
          <div className={classes.icon}>{getIcon(item, currentUser)}</div>
          <div className={classes.description}>{description || ''}</div>
        </div>
        <h5 className={classes.donor}>
          <Avatar className={classes.avatar} data-testid="avatar">
            {donor.displayName.charAt(0)}
          </Avatar>
          {donor.displayName}
        </h5>
      </Grid>
    )
  )
}

function mapStateToProps(state) {
  const { isProcessingItem } = getIsAsyncRequest(state)
  const currentUser = getCurrentUser(state)
  return { isProcessingItem, currentUser }
}

function mapDispatchToState(dispatch) {
  return {
    removeItem: removeItemData => dispatch(REMOVE_ITEM_REQUEST(removeItemData)),
    setRecipient: itemData => dispatch(SET_RECIPIENT_REQUEST(itemData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Item)
