import React from 'react'
import { useTranslation } from 'react-i18next'
import { fade, makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { SET_ITEM_QUERY_FILTER } from '../../../store/actions/sync-actions'
import { getItemFilters } from '../../../store/selectors'

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

function SearchBar(props) {
  const { setQueryFilter, query, isVisible } = props
  const { t } = useTranslation('common')

  const handleQueryChange = event => {
    setQueryFilter(event.target.value)
  }

  const classes = useStyles()

  return (
    <>
      {isVisible && (
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            id="item-search"
            label={t('searchBar.input.label')}
            placeholder={t('searchBar.input.placeholder')}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            onChange={handleQueryChange}
            value={query}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      )}
    </>
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
