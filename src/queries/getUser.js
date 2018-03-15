import gql from 'graphql-tag'

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
