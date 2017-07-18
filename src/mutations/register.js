import { gql } from 'react-apollo'

export default gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password)
  }
`
