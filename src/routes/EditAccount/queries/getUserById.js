import { gql } from 'react-apollo'

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
