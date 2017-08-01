import './search.css'

import React, { Component } from 'react'

import Geosuggest from 'react-geosuggest'
import { Loader } from 'semantic-ui-react'
import { geolocated } from 'react-geolocated'
import styled from 'styled-components'

const SearchContainer = styled.div`margin-top: 200px;`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
  border-radius: 3px;
  background-color: hsla(0, 0%, 39%, .25);
  margin: 0;
  width: 100%;
  height: 35px;
`

class SearchBar extends Component {
  onSuggestSelect = suggest => {
    console.log('SUGGEST: ', suggest)
  }

  render() {
    return !this.props.loaded ? this.renderLoader() : this.renderContent()
  }

  renderLoader = () => {
    return <Loader active />
  }

  renderContent = () => {
    return (
      <SearchContainer>
        <SearchWrapper>
          <Geosuggest
            onSuggestSelect={this.onSuggestSelect}
            suggestsHiddenClassName="geosuggest__suggests--hidden"
          />
        </SearchWrapper>
      </SearchContainer>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(SearchBar)
