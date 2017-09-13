import { gql } from 'react-apollo'

export default gql`
  query discs {
    discs {
      id
      discName
      locationDescription
      latitude
      longitude
      nameOnDisc
    }
  }
`
