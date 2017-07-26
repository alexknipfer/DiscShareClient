import React, { Component } from 'react'

import Autocomplete from 'react-google-autocomplete'
import { Search } from 'semantic-ui-react'
import styled from 'styled-components'

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
`

class SearchBar extends Component {
  render() {
    const styles = {
      width: 500,
      borderRadius: '10px',
      height: 40
    }
    return (
      <SearchContainer>
        <Autocomplete
          style={styles}
          onPlaceSelected={place => {
            console.log(place)
          }}
          types={['(regions)']}
          componentRestrictions={{ country: 'us' }}
        />
      </SearchContainer>
    )
  }
}

export default SearchBar
