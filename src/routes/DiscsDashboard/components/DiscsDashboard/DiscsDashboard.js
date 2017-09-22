import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import queryString from 'query-string'

import DiscsByLocationQuery from '../../../../queries/discsByLocation'

class DiscsDashboard extends Component {
  render() {
    return <h3>Discs Dashboard</h3>
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
