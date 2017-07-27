import React, { Component } from 'react'

import Geosuggest from 'react-geosuggest'
import { Search } from 'semantic-ui-react'
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
    const inputStyle = {
      position: 'relative',
      borderWidth: 0,
      paddingLeft: 12,
      width: '100%',
      height: '35px',
      border: 0,
      color: '#fff',
      backgroundColor: 'transparent',
      outline: 'none',
      display: 'flex',
      alignItems: 'center'
    }
    const suggests = {
      position: 'absolute',
      left: 0,
      right: 0,
      maxHeight: '25em',
      padding: 0,
      marginTop: '-1px',
      background: '#fff',
      border: '2px solid #267dc0',
      borderTopWidth: 0,
      overflowX: 'hidden',
      overflowY: 'auto',
      listStyle: 'none',
      zIndex: 500
    }
    return (
      <SearchContainer>
        <SearchWrapper>
          <Geosuggest style={{ input: inputStyle, suggests: suggests }} />
        </SearchWrapper>
      </SearchContainer>
    )
  }
}

export default SearchBar
