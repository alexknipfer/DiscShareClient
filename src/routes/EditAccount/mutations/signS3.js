import { gql } from 'react-apollo'

export default gql`
  mutation signS3($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      signedRequest
      url
    }
  }
`
