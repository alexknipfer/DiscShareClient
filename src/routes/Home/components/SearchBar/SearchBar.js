import './search.css'

import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import Geosuggest from 'react-geosuggest'
import { geolocated } from 'react-geolocated'
import { Dropdown } from 'semantic-ui-react'
import { observable, action } from 'mobx'

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
  @observable selectedMiles = 10

  @action updateMiles = miles => (this.selectedMiles = miles)

  render() {
    const { selectLocation } = this.props
    return (
      <SearchContainer>
        <SearchWrapper>
          <Geosuggest
            onSuggestSelect={selectLocation}
            suggestsHiddenClassName="geosuggest__suggests--hidden"
          />
        </SearchWrapper>
        <Dropdown
          text={`${this.selectedMiles} miles`}
          icon="filter"
          floating
          labeled
          button
          className="icon"
        >
          <Dropdown.Menu>
            {mileSelections.map(option => (
              <Dropdown.Item
                key={option.value}
                onClick={() => this.updateMiles(option.value)}
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
