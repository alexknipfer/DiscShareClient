import DiscsByLocationQuery from '../queries/discsByLocation'
import DiscsDashboardGrid from './DiscsDashboardGrid'
import { graphql } from 'react-apollo'
import queryString from 'query-string'

export default graphql(DiscsByLocationQuery, {
  props: ({ data: { loading, discsByLocation } }) => ({
    loading,
    discsByLocation
  }),
  options: props => {
    const { lng, lat, radius } = queryString.parse(props.location.search)
    return {
      variables: {
        longitude: lng,
        latitude: lat,
        radius
      }
    }
  }
})(DiscsDashboardGrid)
