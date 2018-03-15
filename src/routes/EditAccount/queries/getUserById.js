import gql from 'graphql-tag'

export default gql`
  query getUserById($userId: ID!) {
    getUserById(userId: $userId) {
      id
      email
      username
      firstName
      profileImage
    }
  }
`
