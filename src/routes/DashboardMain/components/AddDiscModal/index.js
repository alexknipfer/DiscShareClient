import { compose, graphql } from 'react-apollo'

import AddDiscModal from './AddDiscModal'
import AddDiscMutation from '../../mutations/addDisc'
import DiscsQuery from '../../queries/discs'
import SignS3Mutation from '../../../../mutations/signS3'

export default compose(
  graphql(AddDiscMutation, {
    props: ({ mutate }) => ({
      addDisc: (
        discName,
        locationDescription,
        longitude,
        latitude,
        nameOnDisc,
        userId,
        discImage
      ) => {
        return mutate({
          variables: {
            discName,
            locationDescription,
            longitude,
            latitude,
            nameOnDisc,
            userId,
            discImage
          }
        })
      }
    }),
    options: props => ({
      refetchQueries: [
        {
          query: DiscsQuery,
          variables: {
            userId: props.userId
          }
        }
      ]
    })
  }),
  graphql(SignS3Mutation, {
    props: ({ mutate }) => ({
      signS3: (filename, filetype) =>
        mutate({ variables: { filename, filetype } })
    })
  })
)(AddDiscModal)
