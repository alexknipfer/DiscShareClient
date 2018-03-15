import gql from 'graphql-tag'

export default gql`
  query discs($userId: String) {
    discs(userId: $userId) {
      id
      discName
      locationDescription
      nameOnDisc
      discImage
    }
  }
`
