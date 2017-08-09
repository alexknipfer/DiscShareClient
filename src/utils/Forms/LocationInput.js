import React, { Component } from 'react'

import Geosuggest from 'react-geosuggest'
import LocationStore from '../../routes/Home/stores/LocationStore'
import googleMapsWrapper from '../../hocs/googleMapsWrapper'
import { observer } from 'mobx-react'
import styled from 'styled-components'

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

export default googleMapsWrapper(LocationInput)
