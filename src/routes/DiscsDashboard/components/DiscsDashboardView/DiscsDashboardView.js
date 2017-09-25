import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import queryString from 'query-string'
import { Grid } from 'semantic-ui-react'

import DiscsByLocationQuery from '../queries/discsByLocation'
import { CenteredColumn, CenteredGrid } from '../../../../components/CenteredGrid'
import CenteredLoader from '../../../../components/CenteredLoader'
import DashboardCard from '../../../../components/DashboardCard'

class DiscsDashboard extends Component {
  render() {
    const { loading, discsByLocation } = this.props

    if (loading) {
      return <CenteredLoader />
    }

    return (
      <CenteredGrid>
        <Grid.Row>
          {discsByLocation.length === 0 && <h3>No Discs Found</h3>}
          {discsByLocation.map((disc, key) => {
            return (
              <CenteredColumn
                key={key}
                mobile={16}
                tablet={4}
                computer={4}
                style={{ marginBottom: 20 }}
              >
                <DashboardCard
                  image="/images/elliot.jpg"
                  header={disc.discName}
                  meta={disc.locationDescription}
                  description={`The name found on the disc was ${disc.nameOnDisc ||
                    'unknown'}.`}
                />
              </CenteredColumn>
            )
          })}
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
  options: props => {
    const { lng, lat } = queryString.parse(props.location.search)
    return {
      variables: {
        longitude: lng,
        latitude: lat
    }}
  }
})(DiscsDashboard)
