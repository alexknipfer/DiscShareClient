import { gql } from 'react-apollo'

export default gql`
  query getUser($accesstoken: String) {
    getUser(accesstoken: $accesstoken) {
      id
      email
      username
      firstName
      profileImage
    }
  }
`
