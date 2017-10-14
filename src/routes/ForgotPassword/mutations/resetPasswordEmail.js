import { gql } from 'react-apollo'

export default gql`
  mutation resetPasswordEmail($email: String!) {
    resetPasswordEmail(email: $email)
  }
`
