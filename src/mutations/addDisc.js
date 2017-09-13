import { gql } from 'react-apollo'

export default gql`
  mutation addDisc(
    $discName: String!
    $locationDescription: String!
    $latitude: String!
    $longitude: String!
    $nameOnDisc: String
  ) {
    addDisc(
      discName: $discName
      locationDescription: $locationDescription
      latitude: $latitude
      longitude: $longitude
      nameOnDisc: $nameOnDisc
    ) {
      discName
      locationDescription
      latitude
      longitude
      nameOnDisc
    }
  }
`
