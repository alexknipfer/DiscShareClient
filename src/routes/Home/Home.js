import { CenteredGrid } from '../../components/CenteredGrid/CenteredGrid'
import { Grid } from 'semantic-ui-react'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import LocationStore from '../../stores/LocationStore'
import DiscsByLocationQuery from '../../queries/discsByLocation'
import SearchBar from './components/SearchBar'

const selectLocation = (location) => {
  LocationStore.setLocation(location)
}

class Home extends Component {
  render() {
    console.log(LocationStore.currentSelectedLocation.location.lng)
    return (
      <CenteredGrid centered>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={10} computer={8}>
            <SearchBar selectLocation={selectLocation} />
          </Grid.Column>
        </Grid.Row>
      </CenteredGrid>
    )
  }
}

export default graphql(DiscsByLocationQuery, {
  props: ({ data: { loading, discsByLocation } }) => ({
    loading,
    discsByLocation
  }),
  options: props => ({
    variables: {
      longitude: LocationStore.currentSelectedLocation.location.lng,
      latitude: LocationStore.currentSelectedLocation.location.lat
    }
  })
})(Home)