import React, { Component } from 'react'
import { observer } from 'mobx-react'

import Geosuggest from 'react-geosuggest'
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
  onSuggestSelect = location => {
    const { selectLocation } = this.props
    selectLocation(location)
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
