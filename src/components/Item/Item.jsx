import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { connect } from 'react-redux'
import { SET_RECIPIENT_REQUEST } from '../../store/actions'
import { getIsFetchingData } from '../../store/selectors'

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
    backgroundColor: theme.palette.primary.dark
  },
  recipient: {
    ...paperTextStyles,
    marginLeft: '1rem',
    backgroundColor: '#f40b0b'
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

  const { setRecipient } = prop
  const { name, description, seller, recipient, id } = prop.item

  const handleSetRecipient = () => setRecipient(id)

  return (
    <Grid item sm={12} md={6} lg={4}>
      <Paper className={classes.root} elevation={3}>
        <div className={classes.texts}>
          <h1 className={classes.headLine}>
            <div>{name}</div>
            <div style={{ fontSize: '1rem' }}>
              by {seller ? seller.displayName : ''}
            </div>
          </h1>
          {!recipient ? (
            <IconButton
              className={classes.shoppingCardIcon}
              onClick={handleSetRecipient}
            >
              <ShoppingCartIcon color="secondary" fontSize="large" />
            </IconButton>
          ) : (
            <div className={classes.recipient}>
              Goes to happy: {recipient.displayName}
            </div>
          )}
        </div>
        <div className={classes.description}>{description}</div>
      </Paper>
    </Grid>
  )
}

function mapStateToProps(state) {
  const { isFetchingProcessItem } = getIsFetchingData(state)
  return { isFetchingProcessItem }
}

function mapDispatchToState(dispatch) {
  return {
    setRecipient: itemId =>
      dispatch(SET_RECIPIENT_REQUEST({ payload: { id: itemId } }))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Item)
