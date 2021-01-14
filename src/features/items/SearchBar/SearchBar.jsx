import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { SET_ITEM_QUERY_FILTER } from '../../../store/actions/sync-actions'
import { getItemFilters } from '../../../store/selectors'

const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white'
      },
      '&:hover fieldset': {
        borderColor: 'white'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white'
      }
    }
  }
})

function SearchBar(props) {
  const { setQueryFilter, query, isVisible, color, variant } = props
  const { t } = useTranslation('common')

  const handleQueryChange = event => {
    setQueryFilter(event.target.value)
  }

  const classes = useStyles()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem 0'
      }}
    >
      {isVisible && (
        <TextField
          className={classes.root}
          id="item-search"
          label={t('searchBar.input.label')}
          placeholder={t('searchBar.input.placeholder')}
          variant={variant}
          size="medium"
          fullWidth
          value={query}
          onChange={handleQueryChange}
          color={color}
        />
      )}
    </div>
  )
}

function mapStateToProps(state) {
  const { query } = getItemFilters(state)
  return { query }
}

function mapDispatchToState(dispatch) {
  return {
    setQueryFilter: query => dispatch(SET_ITEM_QUERY_FILTER(query))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(SearchBar)
