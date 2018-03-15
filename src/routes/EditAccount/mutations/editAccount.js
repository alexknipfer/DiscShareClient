import gql from 'graphql-tag'

export default gql`
  mutation editAccount(
    $userId: ID
    $email: String!
    $firstName: String!
    $location: String!
    $profileImage: String!
  ) {
    editAccount(
      userId: $userId
      email: $email
      firstName: $firstName
      location: $location
      profileImage: $profileImage
    )
  }
`
