import { gql } from 'react-apollo'

export default gql`
  query discsByLocation($longitude: String, $latitude: String) {
    discsByLocation(longitude: $longitude, latitude: $latitude) {
      id
      discName
      locationDescription
      nameOnDisc
    }
  }
`
