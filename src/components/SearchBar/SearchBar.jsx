import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { SET_ITEM_QUERY_FILTER } from '../../store/actions'

function SearchBar(props) {
  const { setQueryFilter } = props
  const [query, setQuery] = useState('')

  const handleQueryChange = event => {
    setQuery(event.target.value)
    setQueryFilter(event.target.value)
  }

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}
    >
      <TextField
        id="item-search"
        placeholder="Type your search query... "
        label="Search items..."
        variant="outlined"
        size="medium"
        fullWidth
        value={query}
        onChange={handleQueryChange}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToState(dispatch) {
  return {
    setQueryFilter: query => dispatch(SET_ITEM_QUERY_FILTER(query))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(SearchBar)
