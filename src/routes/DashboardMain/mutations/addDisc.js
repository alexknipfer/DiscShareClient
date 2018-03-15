import gql from 'graphql-tag'

export default gql`
  mutation addDisc(
    $discName: String!
    $locationDescription: String!
    $longitude: String!
    $latitude: String!
    $nameOnDisc: String
    $userId: String!
    $discImage: String
  ) {
    addDisc(
      discName: $discName
      locationDescription: $locationDescription
      longitude: $longitude
      latitude: $latitude
      nameOnDisc: $nameOnDisc
      userId: $userId
      discImage: $discImage
    ) {
      discName
      locationDescription
      nameOnDisc
      discImage
    }
  }
`
