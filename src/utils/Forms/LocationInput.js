import React, { Component } from 'react'

import Geosuggest from 'react-geosuggest'
import LocationStore from '../../routes/Home/stores/LocationStore'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
  border-radius: 3px;
  margin: 0;
  width: 100%;
  height: 37px !important;
`
@observer
class LocationInput extends Component {
  onSuggestSelect = suggest => {
    LocationStore.setLocation(suggest)
  }

  render() {
    return (
      <SearchWrapper>
        <Geosuggest
          onSuggestSelect={this.onSuggestSelect}
          suggestsHiddenClassName="geosuggest__suggests--hidden"
        />
      </SearchWrapper>
    )
  }
}

export default LocationInput
