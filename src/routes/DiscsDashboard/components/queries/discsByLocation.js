import { gql } from 'react-apollo'

export default gql`
  query discsByLocation($longitude: String, $latitude: String, $radius: Int) {
    discsByLocation(
      longitude: $longitude
      latitude: $latitude
      radius: $radius
    ) {
      id
      discName
      locationDescription
      nameOnDisc
    }
  }
`
