import { compose, graphql } from 'react-apollo'

import EditAccountForm from './EditAccountForm'
import EditAccountMutation from '../../mutations/editAccount'
import GetUserByIdQuery from '../../queries/getUserById'
import SignS3Mutation from '../../../../mutations/signS3'

export default compose(
  graphql(EditAccountMutation, {
    props: ({ mutate }) => ({
      editAccount: (userId, email, firstName, location, profileImage) =>
        mutate({
          variables: { userId, email, firstName, location, profileImage }
        })
    }),
    options: ({ user }) => ({
      refetchQueries: [
        {
          query: GetUserByIdQuery,
          variables: { userId: user.id }
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
)(EditAccountForm)
