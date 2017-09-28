import './search.css'

import React, { Component } from 'react'

import { Dropdown } from 'semantic-ui-react'
import Geosuggest from 'react-geosuggest'
import HomeStore from '../../stores/HomeStore'
import { geolocated } from 'react-geolocated'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const SearchContainer = styled.div`
  display: flex;
  margin-top: 200px;
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
  border-radius: 3px;
  background-color: hsla(0, 0%, 39%, 0.25);
  margin: 0;
  width: 70%;
  height: 35px;
`

const mileSelections = [
  {
    text: '10 miles',
    value: 10
  },
  {
    text: '20 miles',
    value: 20
  },
  {
    text: '40 miles',
    value: 40
  },
  {
    text: '60 miles',
    value: 60
  }
]

@observer
class SearchBar extends Component {
  render() {
    const { selectLocation } = this.props
    const { radius } = HomeStore

    return (
      <SearchContainer>
        <SearchWrapper>
          <Geosuggest
            onSuggestSelect={selectLocation}
            suggestsHiddenClassName="geosuggest__suggests--hidden"
          />
        </SearchWrapper>
        <Dropdown
          text={`${radius} miles`}
          icon="bullseye"
          floating
          labeled
          button
          className="icon"
          style={{ opacity: 0.5 }}
        >
          <Dropdown.Menu>
            {mileSelections.map(option => (
              <Dropdown.Item
                key={option.value}
                onClick={() => HomeStore.updateRadius(option.value)}
                {...option}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
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
