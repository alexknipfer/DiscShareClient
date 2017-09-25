import { gql } from 'react-apollo'

export default gql`
  mutation editAccount(
    $userId: ID
    $email: String!
    $firstName: String!
    $location: String!
  ) {
    editAccount(
      userId: $userId
      email: $email
      firstName: $firstName
      location: $location
    )
  }
`
