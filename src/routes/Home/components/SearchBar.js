import React, { Component } from 'react'

import Geosuggest from 'react-geosuggest'
import { Search } from 'semantic-ui-react'
import search from './search.css'
import styled from 'styled-components'

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
  border-radius: 6px;
  background-color: hsla(0, 0%, 39%, .25);
  padding-right: 12px;
  margin: 0;
  max-width: 400px;
  height: 35px;
`

class SearchBar extends Component {
  render() {
    return (
      <SearchContainer>
        <SearchWrapper>
          <Geosuggest />
        </SearchWrapper>
      </SearchContainer>
    )
  }
}

export default SearchBar
