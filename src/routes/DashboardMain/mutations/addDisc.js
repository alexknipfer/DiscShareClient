import { gql } from 'react-apollo'

export default gql`
  mutation addDisc(
    $discName: String!
    $locationDescription: String!
    $longitude: String!
    $latitude: String!
    $nameOnDisc: String
    $userId: String!
  ) {
    addDisc(
      discName: $discName
      locationDescription: $locationDescription
      longitude: $longitude
      latitude: $latitude
      nameOnDisc: $nameOnDisc
      userId: $userId
    ) {
      discName
      locationDescription
      nameOnDisc
    }
  }
`
