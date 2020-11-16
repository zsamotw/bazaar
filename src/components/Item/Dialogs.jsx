import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'

const useStyles = makeStyles(theme => ({
  dialogBar: {
    position: 'relative',
    marginBottom: theme.spacing(3)
  },
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  dialogDivider: {
    margin: '1rem 0'
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'flex-start'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Dialogs(props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const {
    openRemoveDialog,
    handleCloseRemoveDialog,
    openConfirmDialog,
    handleCloseConfirmDialog,
    handleRemoveItem,
    handleSetRecipient,
    item
  } = props
  const { name, description, donor, imgURL } = item

  return (
    <>
      <Dialog open={openRemoveDialog} onClose={handleCloseRemoveDialog}>
        <DialogTitle>Remove item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to remove this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemoveDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveItem} color="secondary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.dialogBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.dialogTitle}>
              Confirm taking item
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogActions
          style={{ justifyContent: 'flex-start', padding: '8px 24px' }}
        >
          <Button
            variant="outlined"
            size="large"
            onClick={handleSetRecipient}
            autoFocus
          >
            Take now
          </Button>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
        <DialogContent className={classes.dialogContent}>
          <img src={imgURL} alt="item" height="400px" />
          <h1>{name}</h1>
          <div>{description}</div>
          <Divider className={classes.dialogDivider} />
          <div style={{ textTransform: 'uppercase' }}>From:</div>
          <div>{donor.displayName}</div>
          <div>{donor.email}</div>
        </DialogContent>
      </Dialog>
    </>
  )
}