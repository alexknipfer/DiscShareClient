import { gql } from 'react-apollo'

export default gql`
  mutation resetPassword($password: String!, $token: String!) {
    resetPassword(password: $password, token: $token)
  }
`
